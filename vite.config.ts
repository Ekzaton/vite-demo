import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const hash = Date.now()

      return html
          .replaceAll('.js', '.js?' + hash)
          .replaceAll('.css', '.css?' + hash)
          .replaceAll('.svg', '.svg?' + hash)
          .replaceAll('.png', '.png?' + hash)
          .replaceAll('.jpg', '.jpg?' + hash)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      htmlPlugin(),
  ],
  build: {
    rollupOptions: {
      cache: true,
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
