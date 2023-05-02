export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  css: ['@/assets/css/main.css'],
  modules: [
    'nuxt-content-assets',
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
