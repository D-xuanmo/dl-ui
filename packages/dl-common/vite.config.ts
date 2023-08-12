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
      name: 'DLCommon',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
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
