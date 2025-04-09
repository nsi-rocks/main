function isValidPayload(obj: updateData): boolean {
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
  console.log('body :', body)

  if (!body.every(isValidPayload)) {
    setResponseStatus(event, 400, 'Bad Request')
    return
  }

  try {
    for (const vote of body) {
      if ('assignJ1atelier' in vote && 'assignJ1jour' in vote) {
        await useDrizzle().update(tables.langues)
          .set({
            assignJ1atelier: vote.assignJ1atelier,
            assignJ1jour: vote.assignJ1jour,
          })
          .where(eq(tables.langues.userId, vote.userId))
      }
      if ('assignJ2atelier' in vote && 'assignJ2jour' in vote) {
        await useDrizzle().update(tables.langues)
          .set({
            assignJ2atelier: vote.assignJ2atelier,
            assignJ2jour: vote.assignJ2jour,
          })
          .where(eq(tables.langues.userId, vote.userId))
      }
    }
    setResponseStatus(event, 200, 'OK')
    return 'ok'
  }
  catch (error) {
    console.error('Error updating votes:', error)
    setResponseStatus(event, 500, 'Internal Server Error')
    return 'error'
  }
})
