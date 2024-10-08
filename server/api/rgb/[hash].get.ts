export default cachedEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash')
  if (hash) {
    const data = await hubKV().get(`rgb:${hash}`)
    if (data) {
      return data
    }
    else {
      return new Response('Not found', { status: 404 })
    }
  }
  else {
    return new Response('Bad request', { status: 400 })
  }
}, {
  maxAge: 60 * 60 * 24 * 7,
  getKey: event => `rgb:data:${getRouterParam(event, 'hash')}`,
})
