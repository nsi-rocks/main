export default defineEventHandler(async (event) => {
  const data = await useDrizzle().select().from(tables.logs).all()
  return data
})
