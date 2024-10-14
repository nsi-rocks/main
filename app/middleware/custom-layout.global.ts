import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  const apps = ['rgb', 'md']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  console.log(subdomain)

  setPageLayout(apps.includes(subdomain) ? 'app-layout' : 'default')
})
