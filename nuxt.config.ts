export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      preload: ['python'],
    },
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
