
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.openaq.org/v3',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  }, // <-- this closing brace was missing
});
