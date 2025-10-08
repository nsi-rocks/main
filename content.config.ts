import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: 'en',
      },
      schema: z.object({
        icon: z.string(),
        landing: z.boolean(),
        links: z.array(z.string()),
      }),
    }),
    content_fr: defineCollection({
      type: 'page',
      source: {
        include: 'fr/**',
        prefix: '',
      },
      schema: z.object({
        icon: z.string(),
        landing: z.boolean(),
        links: z.array(z.string()),
      }),
    })
  },
})
