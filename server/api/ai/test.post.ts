export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/html')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Transfer-Encoding', 'chunked')
  const body = await readBody(event)
  console.log('Body:', body)
  const config = useRuntimeConfig()

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        headers: {
          Authorization: `Bearer ${config.mistralAPI}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'mistral-tiny',
          stream: true,
          messages: [{ role: 'user', content: body.query }],
        }),
      })

      if (!response.body) {
        controller.error('Response body is null')
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = "" // Buffer pour stocker les données partielles

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true }) // Ajout au buffer

          // Découpage des messages par ligne
          const lines = buffer.split("\n")

          // On garde la dernière ligne incomplète dans le buffer
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue // Ignore les lignes non "data: "
            const jsonStr = line.replace("data: ", "").trim()

            if (jsonStr === "[DONE]") {
              console.log("Fin du stream")
              controller.close()
              return
            }

            try {
              const json = JSON.parse(jsonStr)
              const content = json.choices?.[0]?.delta?.content || ""
              if (content) {
                controller.enqueue(content)
              }
            } catch (e) {
              console.error("Error parsing JSON:", e, "Raw data:", jsonStr)
            }
          }
        }
      } catch (error) {
        console.error('Stream reading error:', error)
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })

  return sendStream(event, stream)
})