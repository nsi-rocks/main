export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('Body lu :', body)

    const { userId, atelierId } = body
    if (!userId || !atelierId) {
      setResponseStatus(event, 400)
      return { error: 'Missing parameters' }
    }

    const drizzle = useDrizzle()
    if (!drizzle) {
      setResponseStatus(event, 500)
      return { error: 'Failed to initialize drizzle' }
    }

    const res = await drizzle.select().from(tables.langues).where(eq(tables.langues.userId, userId))
    console.log('Requête DB :', res)

    if (res.length === 0) {
      setResponseStatus(event, 404)
      return { error: 'Vote not found' }
    }

    if (res[0].assignJ1atelier === atelierId) {
      console.log('Suppression J1')
      await drizzle.update(tables.langues)
        .set({ assignJ1atelier: 33, assignJ1jour: null })
        .where(eq(tables.langues.userId, userId))
      setResponseStatus(event, 200)
      return { message: 'ok' } // retourne un objet explicite
    }
    else if (res[0].assignJ2atelier === atelierId) {
      console.log('Suppression J2')
      await drizzle.update(tables.langues)
        .set({ assignJ2atelier: 33, assignJ2jour: null })
        .where(eq(tables.langues.userId, userId))
      setResponseStatus(event, 200)
      return { message: 'ok' }
    }
    else {
      setResponseStatus(event, 404)
      return { error: 'Vote not found' }
    }
  }
  catch (error) {
    console.error('Erreur générale :', error)
    setResponseStatus(event, 500)
    return { error: 'Erreur interne du serveur', details: error.message || error.toString() }
  }
})
