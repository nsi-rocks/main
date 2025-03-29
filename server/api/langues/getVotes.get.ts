export default defineEventHandler(async (event) => {
  const res = await useDrizzle().select().from(tables.langues).leftJoin(tables.users, eq(tables.langues.userId, tables.users.id))

  return res.map((row) => ({
    ...row.langues,
    ...row.users
  }))
})
