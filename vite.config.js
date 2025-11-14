import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true
      },
      "/ollama": {  // Proxy sécurisé pour Ollama
        target: import.meta.env.VITE_OLLAMA_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ollama/, '')
      }
    }
  },
    // ✅ Permet d'importer des fichiers JSON en mode dev
  optimizeDeps: {
    include: ['server/site-content.json']
  }
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})


