import { aliasedTable, eq } from 'drizzle-orm'
type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (await denies(event, userOrDev)) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }
  const ateliers2 = aliasedTable(tables.ateliers, "ateliers2")
  const res = await useDrizzle()
    .select({
      langues: tables.langues,
      ateliers: tables.ateliers,
      ateliers2: ateliers2
    })
    .from(tables.langues)
    .where(eq(tables.langues.userId, session.user?.id || '0daa3203-4e69-45d9-bafe-5f201aedabe6'))
    .leftJoin(tables.ateliers, eq(tables.langues.a2choix, tables.ateliers.id))
    .leftJoin(ateliers2, eq(tables.langues.a1choix, ateliers2.id))
    .all()

  if (res.length === 0) {
    setResponseStatus(event, 200)
    return { timestamp: null }
  }
  setResponseStatus(event, 200)
  return {
    ...res[0].langues,
    atelier1: res[0].ateliers,
    atelier2: res[0].ateliers2
  } as LangueAvecAteliers
})
