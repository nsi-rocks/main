import type { Collections } from '@nuxt/content'

type Lang = 'fr' | 'en'
const DEFAULT_LOCALE: Lang = 'fr'

// → Déduit la locale de l'URL: /en/... → en, sinon fr
const localeFromPath = (path: string): Lang =>
  path.startsWith('/en') ? 'en' as const : 'fr' as const

export function useContentKey() {
  const route = useRoute()

  const urlLocale = computed<Lang>(() => route.path?.startsWith('/en') ? 'en' : 'fr')

  // path without the /en prefix
  const contentPath = computed(() => (route.path || '/').replace(/^\/en(?=\/|$)/, '') || '/')

  // full reactive route path
  const routePath = computed(() => route.path || '/')

  // purely string key
  const pageKey = computed(() => `page:${urlLocale.value}:${contentPath.value}`)

  return { pageKey, urlLocale, contentPath, routePath }
}

// Composable centralisé pour récupérer le contenu de page
export function useCurrentPage() {
  const { pageKey, urlLocale, contentPath, routePath } = useContentKey()

  return useAsyncData(
    () => pageKey.value,
    async () => {
      const coll = ('content_' + urlLocale.value) as keyof Collections

      let doc = await queryCollection(coll).path(routePath.value).first()

      // Fallback to default locale
      if (!doc && urlLocale.value !== DEFAULT_LOCALE) {
        doc = await queryCollection(('content_' + DEFAULT_LOCALE) as keyof Collections)
          .path(contentPath.value)
          .first()
      }
      return doc
    },
    { watch: [urlLocale, contentPath] }
  )
}

export function useLocaleNavigation() {
  const { urlLocale, contentPath } = useContentKey()

  // a stable key per locale + top-level section
  const navKey = computed(() => {
    const section = contentPath.value.split('/')[1] || '' // nsi | snt | ''
    return `nav:${urlLocale.value}:${section}`
  })

  return useAsyncData(
    () => navKey.value,
    async () => {
      const coll = ('content_' + urlLocale.value) as keyof Collections

      let tree = await queryCollectionNavigation(coll, ['icon', 'description'])
      if ((!tree || tree.length === 0) && urlLocale.value !== DEFAULT_LOCALE) {
        tree = await queryCollectionNavigation(('content_' + DEFAULT_LOCALE) as keyof Collections, ['icon', 'description'])
      }

      const sanitized = tree.length === 1 ? tree[0].children || [] : tree
      const prefix = urlLocale.value === DEFAULT_LOCALE ? '' : '/' + urlLocale.value

      const local = sanitized.find(el => el.path === [prefix, contentPath.value.split('/')[1]].join('/'))

      return local?.children ?? []
    },
    { watch: [urlLocale, contentPath] }
  )
}