export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const isQuery = query.query || false
  
  const session = await getUserSession(event)
  const userId = session?.user?.id
  // if (!userId) return []
  const key = `rgb:user:${userId}`
  if (isQuery === 'my') {
    const data: string[] = await hubKV().get(key) || []
    return data.map(el => 'rgb:' + el)
  }
  const data: string[] = await hubKV().keys('rgb')

  return data.filter(el => el.split(':')[1] !== 'user')
})
