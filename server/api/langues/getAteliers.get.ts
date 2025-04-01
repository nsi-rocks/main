export default defineEventHandler(async (event) => {
  interface AtelierAvecNbChoix extends Atelier {
    nbChoix: [number, number, number, number, number] // [a2, jour1, jour2, jour3, jour4]
  }

  const res = await useDrizzle()
    .select()
    .from(tables.ateliers)
    .leftJoin(tables.langues, or(
      eq(tables.langues.a1choix, tables.ateliers.id),
      eq(tables.langues.a2choix, tables.ateliers.id),
    ))

  const result = res.reduce<AtelierAvecNbChoix[]>((acc, row) => {
    const { ateliers: atelier, langues: langue } = row
    if (!atelier) return acc // sécurité

    let existingAtelier = acc.find(item => item.id === atelier.id)

    if (!existingAtelier) {
      existingAtelier = { ...atelier, nbChoix: [0, 0, 0, 0, 0] }
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
    }

    return acc
  }, [])

  return result
})
