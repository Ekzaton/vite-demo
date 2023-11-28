import { defineConfig } from 'vite'
import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react'

const hash = Date.now()

const htmlTransformPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replaceAll('.js', '.js?' + hash).replaceAll('.css', '.css?' + hash)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      htmlTransformPlugin(),
      replace({
        include: ['**/*.js'],
        values: {
          '.svg': '.svg?' + hash,
          '.png': '.png?' + hash,
          '.jp(e)?g': '.jp(e)?g?' + hash,
          '.gif': '.gif?' + hash,
          '.webp': '.webp?' + hash,
        },
      }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
