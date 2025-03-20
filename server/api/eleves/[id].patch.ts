export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return 'Hello Nitro'
  }

  return await useDrizzle().update(tables.users).set(body).where(eq(tables.users.id, id)).returning()

})
