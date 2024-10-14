import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  const apps = ['rgb']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  setPageLayout(apps.includes(subdomain) ? 'app-layout' : 'default')
})
