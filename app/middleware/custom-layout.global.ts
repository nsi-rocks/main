import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware(() => {
  const apps = ['rgb', 'md', 'exif']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  console.log(subdomain)

  setPageLayout(apps.includes(subdomain) ? 'app-layout' : 'default')
})
