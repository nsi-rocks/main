export const listPosts = defineAbility(() => true) // Only authenticated users can list posts

export const adminOrDev = defineAbility({ allowGuest: true }, (user: User | null) => {
    return user?.teacher || import.meta.dev
})

export const userOrDev = defineAbility({ allowGuest: true }, (user: User | null) => {
    return !!user || import.meta.dev
})