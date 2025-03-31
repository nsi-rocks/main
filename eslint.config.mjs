// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
)
