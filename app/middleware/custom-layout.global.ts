export default defineNuxtRouteMiddleware(() => {
  const subdomain = useSubdomain()

  // Liste des sous-domaines à traiter
  const apps = ['rgb', 'langues']

  if (apps.includes(subdomain)) {
    setPageLayout('app-layout')
  }
})