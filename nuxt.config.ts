export default defineNuxtConfig({
  colorMode: {
    preference: 'dark'
  },
  extends: ['@nuxt/ui-pro'],
  devtools: {
    enabled: false,
  },
  modules: ['nuxt-content-assets', '@nuxt/content', '@nuxt/ui', '@pinia/nuxt'],
  // experimental: {
  //   renderJsonPayloads: false,
  // },
  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'
      }]
    }
  },
  routeRules: {
    '/api/search.json': { prerender: true }
  },
  content: {
    documentDriven: {
      injectPage: false
    },
    experimental: {
      clientDB: true,
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
  compatibilityDate: '2024-07-22',
})