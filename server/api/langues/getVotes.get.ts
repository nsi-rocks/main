import { like } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const res = await useDrizzle().select().from(tables.langues).leftJoin(tables.users, and(eq(tables.langues.userId, tables.users.id), like(tables.users.classes, '%2NDE%')))

  type Row = {
    users: User | null
    langues: Langue
  }
  type MergedRow = Langue & Partial<User>

  return res.filter(el => el.users?.teacher === false).map((row: Row) => ({
    ...row.langues,
    ...row.users,
  })) as MergedRow[]
})
