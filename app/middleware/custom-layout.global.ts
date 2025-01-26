import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  const apps = ['rgb', 'md', 'exif']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''

  setPageLayout(apps.includes(subdomain) ? 'app-layout' : to.fullPath.split('?')[0] === '/' ? 'landing' : 'default')
})
