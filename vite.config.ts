import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      cache: true,
      output: {
        entryFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name].[ext]`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
