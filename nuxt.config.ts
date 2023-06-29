export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  css: ['@/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    'nuxt-content-assets',
    '@nuxthq/ui',
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
    }
  }
})
