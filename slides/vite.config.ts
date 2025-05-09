import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
    },
  },
})
