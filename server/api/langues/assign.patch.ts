function isValidPayload(obj: Record<string, any>): boolean {
  const hasUserId = 'userId' in obj
  const hasJ1 = 'assignJ1atelier' in obj && 'assignJ1jour' in obj
  const hasJ2 = 'assignJ2atelier' in obj && 'assignJ2jour' in obj
  return hasUserId && (hasJ1 || hasJ2)
}

export default defineEventHandler(async (event) => {
  if (await denies(event, adminOrDev)) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }
  const body = await readBody(event)
  if (!isValidPayload(body)) {
    setResponseStatus(event, 400, 'Bad Request')
    return
  }

  console.log('Assignation des ateliers :', body)
})
