export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getUserSession(event)
  if (await denies(event, userOrDev)) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }

  const res = await useDrizzle().update(tables.langues).set(body).where(eq(tables.langues.userId, session.user?.id || '0daa3203-4e69-45d9-bafe-5f201aedabe6')).returning()

  setResponseStatus(event, 200)
  return res
})
