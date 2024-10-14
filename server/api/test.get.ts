export default defineEventHandler(async (event) => {
  const test = getCookie(event, 'redirection')
  console.log(test)

  return test
})
