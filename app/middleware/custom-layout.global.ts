import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  const apps = ['rgb', 'lang']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  // if (to.fullPath === '/user') return setPageLayout('landing')
  // else setPageLayout(apps.includes(subdomain) ? 'app-layout' : to.fullPath.split('?')[0] === '/' ? 'landing' : 'default')
  if (apps.includes(subdomain)) setPageLayout('app-layout')
})
