import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DLUI',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'dl-common'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: 'index.[ext]',
        sourcemap: true
      }
    }
  }
})
