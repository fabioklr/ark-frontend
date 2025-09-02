import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@hcaptcha/vue3-hcaptcha'],
          maps: ['mapbox-gl', '@mapbox/mapbox-gl-geocoder'],
          utils: ['@emailjs/browser', 'image-conversion', 'pocketbase']
        }
      }
    }
  }
})
