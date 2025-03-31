export default defineEventHandler(async (event) => {
  const res = await useDrizzle().select().from(tables.langues).leftJoin(tables.users, eq(tables.langues.userId, tables.users.id))

  type Row = {
    users: User | null
    langues: Langue
  }
  type MergedRow = Langue & Partial<User>

  return res.filter(el => JSON.parse(el.users?.classes || '').length === 1).map((row: Row) => ({
    ...row.langues,
    ...row.users,
  })) as MergedRow[]
})
