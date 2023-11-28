import { defineConfig } from 'vite'
import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react'

const htmlTransformPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const hash = Date.now()

      return html
          .replaceAll('.js', '.js?' + hash)
          .replaceAll('.css', '.css?' + hash)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      htmlTransformPlugin(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        replace({
          include: ['**/*.js'],
          values: {
            '.svg': '.svg?' + Date.now(),
            '.png': '.png?' + Date.now(),
            '.jp(e)?g': '.jp(e)?g?' + Date.now(),
            '.gif': '.gif?' + Date.now(),
            '.webp': '.webp?' + Date.now(),
          },
        }),
      ],
      cache: true,
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
