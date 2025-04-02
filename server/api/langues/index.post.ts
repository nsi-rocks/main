import { eq, or, inArray } from 'drizzle-orm'
import { useDrizzle } from '#imports'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getUserSession(event)

  if (await denies(event, userOrDev)) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }

  const db = useDrizzle()

  // Récupérer uniquement les lignes utiles
  const rows = await db
    .select()
    .from(tables.ateliers)
    .leftJoin(
      tables.langues,
      or(
        eq(tables.langues.a1choix, tables.ateliers.id),
        eq(tables.langues.a2choix, tables.ateliers.id),
      ),
    )
    .where(inArray(tables.ateliers.id, [body.a1choix, body.a2choix]))

  // Réduction pour obtenir les deux ateliers et leur nbChoix
  const ateliers: {
    [id: number]: {
      atelier: Atelier
      nbChoix: [number, number, number, number, number]
    }
  } = {}

  for (const row of rows) {
    const { ateliers: atelier, langues: langue } = row
    if (!atelier) continue

    const id = atelier.id
    if (!ateliers[id]) {
      ateliers[id] = {
        atelier,
        nbChoix: [0, 0, 0, 0, 0],
      }
    }

    if (langue) {
      if (langue.a2choix === id) {
        ateliers[id].nbChoix[0]++
      }
      if (langue.a1choix === id) {
        const jour = langue.a1jour
        if (jour >= 1 && jour <= 4) {
          ateliers[id].nbChoix[jour]++
        }
      }
    }
  }

  const a1 = ateliers[body.a1choix]
  const a2 = ateliers[body.a2choix]

  if (!a1 || !a2) {
    setResponseStatus(event, 400, 'Atelier introuvable')
    return
  }

  const jour = body.a1jour

  // === Atelier 1 : validation précise sur le jour choisi ===

  // 1. Nombre de sessions sur le jour choisi
  const sessionsJourA1 = a1.atelier.jours.filter(j => j === jour).length
  const maxPlacesJourA1 = a1.atelier.max * sessionsJourA1
  const nbChoixJourA1 = a1.nbChoix[jour]

  // 2. Total de places sur tous les jours
  const totalPlacesA1 = a1.atelier.jours.length * a1.atelier.max
  const totalChoixA1 = a1.nbChoix.reduce((a, b) => a + b, 0)

  // 3. Places restantes globales
  const remainingPlacesA1 = totalPlacesA1 - totalChoixA1

  // 4. Est-ce que cette dernière place est déjà "promise" à un a2choix ?
  const isLastSpotBlockedForA2 = remainingPlacesA1 === 0

  console.log('places restantes', remainingPlacesA1)
  console.log('a1choix', a1.nbChoix)
  console.log('a2choix', a2.nbChoix)
  console.log('isLastSpotBlockedForA2', isLastSpotBlockedForA2)

  // 5. Condition finale pour a1choix
  const isA1Dispo = nbChoixJourA1 < maxPlacesJourA1 && !isLastSpotBlockedForA2

  // === Atelier 2 : validation globale sur la somme ===

  const totalChoixA2 = a2.nbChoix.reduce((a, b) => a + b, 0)
  const totalPlacesA2 = a2.atelier.jours.length * a2.atelier.max
  const isA2Dispo = totalChoixA2 < totalPlacesA2

  // === Refus si l’un des deux choix n’est pas valide ===
  if (!isA1Dispo || !isA2Dispo) {
    setResponseStatus(event, 400, 'Atelier complet')
    return
  }

  // Tout est bon, on enregistre
  try {
    const res = await db.insert(tables.langues).values({
      userId: session.user?.id || '0daa3203-4e69-45d9-bafe-5f201aedabe6',
      a1choix: body.a1choix,
      a1jour: body.a1jour,
      a2choix: body.a2choix,
      toReset: body.toReset,
      commentaire: body.commentaire,
    }).onConflictDoUpdate({
      target: tables.langues.userId,
      set: {
        a1jour: body.a1jour,
        a1choix: body.a1choix,
        a2choix: body.a2choix,
        toReset: body.toReset,
        commentaire: body.commentaire,
      },
    }).returning()

    await db.insert(tables.logs).values({
      logType: 'langues',
      logData: 'Vote langues',
      userId: session.user?.id || '0daa3203-4e69-45d9-bafe-5f201aedabe6',
    })

    setResponseStatus(event, 200)
    return res
  }
  catch (e) {
    console.error('Erreur insertion langues:', e)
    setResponseStatus(event, 500, 'Erreur serveur')
  }
})
