import { aliasedTable, like, isNull } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const langues = aliasedTable(tables.langues, 'langues')
  const users = aliasedTable(tables.users, 'users')

  const res = await useDrizzle()
    .select()
    .from(tables.ateliers)
    .leftJoin(langues, or(
      eq(langues.a1choix, tables.ateliers.id),
      eq(langues.a2choix, tables.ateliers.id),
    ))
    .leftJoin(users, eq(users.id, langues.userId))
    .where(
      or(isNull(users.id), and(eq(users.teacher, false), like(users.classes, '%2NDE%'))),
    )

  const result = res.reduce<AtelierAvecNbChoix[]>((acc, row) => {
    const { ateliers: atelier, langues: langue } = row
    if (!atelier) return acc // sécurité

    let existingAtelier = acc.find(item => item.id === atelier.id)

    if (!existingAtelier) {
      existingAtelier = { ...atelier, nbChoix: [0, 0, 0, 0, 0], assignedChoix: [0, 0, 0, 0] }
      acc.push(existingAtelier)
    }

    if (langue) {
      if (langue.a2choix === atelier.id) {
        existingAtelier.nbChoix[0]++
      }
      if (langue.a1choix === atelier.id) {
        const jour = langue.a1jour
        if (jour >= 1 && jour <= 4) {
          existingAtelier.nbChoix[jour]++
        }
      }
      if (langue.assignJ1atelier === atelier.id) {
        const jour = langue.assignJ1jour || 0
        if (jour >= 1 && jour <= 4) {
          existingAtelier.assignedChoix[jour]++
        }
      }
      if (langue.assignJ2atelier === atelier.id) {
        const jour = langue.assignJ2jour || 0
        if (jour >= 1 && jour <= 4) {
          existingAtelier.assignedChoix[jour]++
        }
      }
    }

    return acc
  }, [])

  return result as AtelierAvecNbChoix[]
  // return { count: res.length, data: res }
})
