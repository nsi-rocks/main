export default defineEventHandler(async (event) => {
  const data = await useDrizzle().select().from(tables.users).all()
  return data
})
