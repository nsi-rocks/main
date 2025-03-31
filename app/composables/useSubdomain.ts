import { getSubdomain } from 'tldts'

export const useSubdomain = (): string => {
  if (import.meta.server) {
    const host = useRequestHeaders()['host'] || ''
    return getSubdomain(host) || ''
  }

  if (import.meta.client) {
    return getSubdomain(window.location.hostname) || ''
  }

  return ''
}
