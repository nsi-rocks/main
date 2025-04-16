export default defineEventHandler(async (event) => {
  const { userId, atelierId } = await readBody(event)
  console.log('deleteVote', userId, atelierId)

  try {
    const res = await useDrizzle().select().from(tables.langues).where(eq(tables.langues.userId, userId))
    console.log('deleteVote', res)
    if (res.length === 0) {
      setResponseStatus(event, 404)
      return { error: 'Vote not found' }
    }
    if (res[0].assignJ1atelier === atelierId) {
      console.log('suppression J1')
      try {
        await useDrizzle().update(tables.langues).set({ assignJ1atelier: 33, assignJ1jour: null }).where(eq(tables.langues.userId, userId))
        setResponseStatus(event, 204)
        return 'ok'
      }
      catch (error) {
        console.error('Error updating J1:', error)
        setResponseStatus(event, 500)
        return { error: 'Failed to update J1' }
      }
    }
    else if (res[0].assignJ2atelier === atelierId) {
      console.log('suppression J2')
      try {
        await useDrizzle().update(tables.langues).set({ assignJ2atelier: 33, assignJ2jour: null }).where(eq(tables.langues.userId, userId))
        setResponseStatus(event, 204)
        return 'ok'
      }
      catch (error) {
        console.error('Error updating J2:', error)
        setResponseStatus(event, 500)
        return { error: 'Failed to update J2' }
      }
    }
    else {
      setResponseStatus(event, 404)
      return { error: 'Vote not found' }
    }
  }
  catch (error) {
    console.error('Error deleting vote:', error)
    setResponseStatus(event, 500)
    return { error: 'Failed to delete vote' }
  }
})
