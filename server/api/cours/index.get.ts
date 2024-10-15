export default defineEventHandler(async (event) => {
  const data = await hubKV().get('cours:1510')
  return data
})
