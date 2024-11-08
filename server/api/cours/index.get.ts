export default defineEventHandler(async (event) => {
  const didHandleCors = handleCors(event, {
    origin: '*',
    preflight: {
      statusCode: 204,
    },
    methods: '*',
  })
  if (didHandleCors) {
    return
  }
  console.log('cours')

  const data = await hubKV().get('cours:1510')
  return data
})
