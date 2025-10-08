// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
          integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
          crossorigin: 'anonymous',
        },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'NSI Rocks !' }
      ]
    },
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://nsi.rocks',
    name: 'NSI Rocks !',
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      redirectOn: 'root',
      fallbackLocale: 'fr'
    }
  },
  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {},
        },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            light: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
          langs: ['py', 'md', 'http'],
        },
      },
    },
  },

  compatibilityDate: '2025-01-20',
  fonts: {
    provider: 'fontsource',
    defaults: {
      subsets: ['latin'],
      weights: ['400 700'],
      styles: ['normal', 'italic'],
    }
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["@cloudflare/workers-types/2023-07-01"],
      },
    },
  },

  nitro: {
    prerender: { 
      autoSubfolderIndex: false,
      crawlLinks: true,
    }
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons',
    }],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})