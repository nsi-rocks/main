export default defineEventHandler(async (event) => {
  // const user = await getUserSession(event)
  // console.log(user)

  const id = getRouterParam(event, 'hash')
  console.log(id)

  // await hubKV().del(`rgb:${id}`)
})
