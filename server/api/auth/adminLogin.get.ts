export default defineEventHandler(async (event) => {
  if (import.meta.dev) {
    const redirectCookie = getCookie(event, 'redirection')

    const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.user, 'mathieu.nicolas'))

    const res = await setUserSession(event, {
      user: user[0],
      loggedInAt: new Date().toISOString(),
    })
    console.log(res)

    if (redirectCookie && ['rgb', 'langues'].includes(redirectCookie)) {
      setCookie(event, 'redirection', '', { maxAge: 0, domain: '.localhost.com' })
      await sendRedirect(event, `https://${redirectCookie}.localhost.com:3000`)
    }
    else
    // await sendRedirect(event, `https://nsi.rocks?ck=${redirectCookie}`)
      await sendRedirect(event, `https://localhost.com:3000`)

    return res
  }
  else {
    setResponseStatus(event, 403)
    return {
      error: 'Forbidden',
      message: 'This endpoint is only available in development mode.',
    }
  }
})
