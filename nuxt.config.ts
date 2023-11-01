export default defineNuxtConfig({
  hooks: {
    close: () => {
      process.exit()
    }
  },
  ssr: false,
  extends: ['@nuxt/ui-pro'],
  devtools: { enabled: true },
  modules: [
    'nuxt-content-assets',
    '@nuxt/content',
    '@nuxt/ui'
  ],
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
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: [
        'rehype-katex'
      ]
    },
    highlight: {
      preload: ['py', 'md']
    }
  },
  ui: {
    global: true
  },
  components: {
    global: true,
    dirs: ['~/components']
  }
})
