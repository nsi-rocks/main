export default defineEventHandler(async (event) => {
  console.log('logout')

  await clearUserSession(event)

  return 'Hello Nitro'
})
