export default defineNuxtConfig({
  hooks: {
    close: () => {
      process.exit()
    }
  },
  extends: '@nuxt-themes/docus',
  css: ['@/assets/css/main.css'],
  devtools: { enabled: false },
  modules: [
    'nuxt-content-assets',
    '@nuxt/content'
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
  }
})
