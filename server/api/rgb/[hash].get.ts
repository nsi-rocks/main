export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash')
  const query = getQuery(event)
  console.log(query)

  if (hash) {
    const data = await hubKV().get(`rgb:${hash}`)
    if (data) {
      if (query && Object.keys(query).includes('img')) {
        console.log(data)
        setResponseHeader(event, 'Content-Type', 'image/png')
        const { nbCases, pixels } = data
        return genPNG({
          nbCases: nbCases,
          pixels: pixels.map(({ r, g, b }) => [r, g, b]).flat() })
      }
      return data
    }
    else {
      return new Response('Not found', { status: 404 })
    }
  }
  else {
    return new Response('Bad request', { status: 400 })
  }
})

// , {
//   maxAge: 60 * 60 * 24 * 7,
//   getKey: event => `rgb:data:${getRouterParam(event, 'hash')}`,
// }
