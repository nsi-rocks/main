export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getUserSession(event)
  if (await denies(event, userOrDev)) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }

  try {
    const res = await useDrizzle().insert(tables.langues).values({
      userId: session.user?.id || '0daa3203-4e69-45d9-bafe-5f201aedabe6',
      a1choix: body.a1choix,
      a1jour: body.a1jour,
      a2choix: body.a2choix,
      toReset: body.toReset,
    }).onConflictDoUpdate({
      target: tables.langues.userId,
      set: {
        a1jour: body.a1jour,
        a1choix: body.a1choix,
        a2choix: body.a2choix,
        toReset: body.toReset,
      },
    }).returning()
    setResponseStatus(event, 200)
    return res
  }
  catch (e) {
    console.log('e:', e);

  }
})
