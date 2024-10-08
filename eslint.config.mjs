// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  [{
    ignores: ['node_modules/*', '.nuxt/*', 'dist/*', '.output/*', '.wrangler/*'],
  }],
).overrideRules({
  'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
})
