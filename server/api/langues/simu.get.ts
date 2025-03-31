export default defineEventHandler(async (event) => {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const eleves = await useDrizzle().select().from(tables.users)
  for (const eleve of eleves) {
    if (eleve.teacher) continue
    // Générer les valeurs aléatoires avant d'effectuer l'insertion
    const a1choix = getRandomInt(1, 30)
    const a1jour = getRandomInt(1, 4)
    const a2choix = getRandomInt(1, 30)

    // Insérer ou mettre à jour les données
    await useDrizzle()
      .insert(tables.langues)
      .values({
        userId: eleve.id,
        a1choix: a1choix,
        a1jour: a1jour,
        a2choix: a2choix,
      })
      .onConflictDoUpdate({
        target: tables.langues.userId,
        set: {
          a1jour: a1jour,
          a1choix: a1choix,
          a2choix: a2choix,
        },
      })
  }
  return 'coucou'
})
