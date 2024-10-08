export default defineEventHandler(async (event) => {
  const jsonData = await readBody(event)

  // Sauvegarde l'image dans un buffer
  setResponseHeader(event, 'Content-Type', 'image/png')

  return genPNG(jsonData)
})
