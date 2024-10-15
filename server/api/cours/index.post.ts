export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (await hubKV().has('cours:1510')) {
    const data = await hubKV().get('cours:1510')
    data.push(body)
    await hubKV().set('cours:1510', data)
  }
  else await hubKV().set('cours:1510', [body])

  return body
})
