export default defineEventHandler((event) => {
  event.node.res.on('close', () => {
    if (event.node.res.statusCode === 500) {
      console.error('💥 Requête 500 :', event.node.req.url)
    }
  })
})
