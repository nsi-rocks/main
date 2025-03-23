export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await getUserSession(event)
  if (user) {
    await hubKV().set(`langues:${user.id}`, body)
    return 'ok'
  }
  else {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'not logged'
  }
})
