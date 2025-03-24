export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getUserSession(event)

  if (await allows(event, allowLangues)) {
    if (session.user) {
      await hubKV().set(`langues:${session.user.id}`, body)
      return 'ok'
    }
    else {
      setResponseStatus(event, 401, 'Unauthorized')
      return 'not logged'
    }
  } else {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'not allowed'
  } 
})
