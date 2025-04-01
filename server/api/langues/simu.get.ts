export default defineEventHandler(async (event) => {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const db = useDrizzle()

  // Récupération des élèves non profs
  const eleves = await db.select().from(tables.users)
  const elevesSansProf = eleves.filter(e => !e.teacher)

  // Récupération de tous les ateliers avec leurs jours
  const ateliers = await db.select().from(tables.ateliers)

  for (const eleve of elevesSansProf) {
    // Choix aléatoires mais cohérents :
    const atelierA1 = ateliers[getRandomInt(0, ateliers.length - 1)]
    const joursA1 = atelierA1.jours.filter(j => j >= 1 && j <= 4)
    if (joursA1.length === 0) continue // skip ateliers non planifiés sur les bons jours

    const a1jour = joursA1[getRandomInt(0, joursA1.length - 1)]

    let atelierA2 = atelierA1
    while (atelierA2.id === atelierA1.id) {
      atelierA2 = ateliers[getRandomInt(0, ateliers.length - 1)]
    }

    await db.insert(tables.langues)
      .values({
        userId: eleve.id,
        a1choix: atelierA1.id,
        a1jour: a1jour,
        a2choix: atelierA2.id,
        toReset: false,
      })
      .onConflictDoUpdate({
        target: tables.langues.userId,
        set: {
          a1choix: atelierA1.id,
          a1jour: a1jour,
          a2choix: atelierA2.id,
          toReset: false,
        },
      })
  }

  return 'Simulation terminée avec succès'
})
