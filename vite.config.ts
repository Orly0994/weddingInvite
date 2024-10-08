import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  server: {
    port: 5050,
    host: true,
  },

  build: {
    sourcemap: true,
    target: 'es2015',
    minify: true,
  },
})
