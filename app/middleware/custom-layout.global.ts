import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/api/')) return // Ne pas exécuter le middleware sur les API

  const apps = ['rgb', 'langues']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  
  if (apps.includes(subdomain)) setPageLayout('app-layout')
})