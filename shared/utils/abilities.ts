export const listPosts = defineAbility(() => true) // Only authenticated users can list posts

export const adminOrDev = defineAbility({ allowGuest: true }, (user: User | null) => {
  return user?.teacher || import.meta.dev
})

export const userOrDev = defineAbility({ allowGuest: true }, (user: User | null) => {
  return !!user || import.meta.dev
})

export const allowLangues = defineAbility({ allowGuest: true }, (user: User | null) => {
  const regex = /\b2NDE\b/i

  if (user?.teacher || import.meta.dev) return true

  try {
    const classes: string[] = JSON.parse(user.classes)
    return classes.some((c: string) => regex.test(c))
  }
  catch (e) {
    console.error('Erreur de parsing JSON dans user.classes :', e)
    return false
  }
})

export const userNotSecond = defineAbility((user: User) => {
  const regex = /\b2NDE\b/i

  try {
    const classes: string[] = JSON.parse(user.classes)
    return classes.some((c: string) => regex.test(c))
  }
  catch (e) {
    console.error('Erreur de parsing JSON dans user.classes :', e)
    return false
  }
})
