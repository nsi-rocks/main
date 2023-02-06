export default defineNuxtConfig({
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
      }]
    }
  },
  content: {
    highlight: {
      preload: ['python'],
    },
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: [
        'rehype-katex'
      ]
    }
  },
  extends: '@nuxt-themes/docus',
  css: ['@/assets/css/main.css'],
  nitro: {
    prerender: {
      routes: [
          '/1.snt',
          '/2.nsi',
      ]
    }
  }
})
