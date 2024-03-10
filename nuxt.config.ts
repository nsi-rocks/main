export default defineNuxtConfig({
    hooks: {
    close: () => {
      process.exit()
    }
  },
  colorMode: {
    preference: 'dark'
  },
  ssr: false,
  devServer: {
    port: 3000
  },
  extends: ['@nuxt/ui-pro'],
  devtools: { enabled: false },
  modules: [ 'nuxt-content-assets', '@nuxt/content', '@nuxt/ui', "@nuxt/image"],
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
      rehypePlugins: [
        'rehype-katex'
      ]
    },
    highlight: {
      preload: ['py', 'md']
    }
  },
  ui: {
    global: true,
    icons: ['noto']
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
})
