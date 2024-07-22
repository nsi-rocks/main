export default defineNuxtConfig({
  colorMode: {
    preference: 'dark'
  },

  ssr: false,
  extends: ['@nuxt/ui-pro'],
  devtools: { enabled: true },
  modules: ['nuxt-content-assets', '@nuxt/content', '@nuxt/ui'],

  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
      }]
    }
  },

  content: {
    documentDriven: {
      injectPage: false
    },
    experimental: {
      clientDB: true
    },
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: {
        'rehype-katex': {
          output: 'html' // the default value is 'htmlAndMathml'
        }
      }
    },
    highlight: {
      preload: ['py', 'md']
    }
  },

  ui: {
    global: true,
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  nitro: {
    prerender: {
      routes: [
        '/api/search.json'
      ]
    }
  },
  compatibilityDate: '2024-07-22',
})