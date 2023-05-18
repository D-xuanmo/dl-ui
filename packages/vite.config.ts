import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/icon/icons')],
      symbolId: 'd-icon-[name]',
      customDomId: '__dlui__svg__icons__dom__'
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx()
  ],
  server: {
    open: '/',
    host: '0.0.0.0'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'dl-ui',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: 'index.[ext]'
      }
    }
  }
})
