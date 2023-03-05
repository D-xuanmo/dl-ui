import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import shiki from 'markdown-it-shiki'
import Markdown from 'vite-plugin-md'
import MarkdownPreview, { transformer } from '@xuanmo/vite-plugin-md-preview'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(__dirname, 'src/icon/icons')],
      // 指定symbolId格式
      symbolId: 'd-icon-[name]'
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown({
      transforms: {
        before: transformer
      },
      markdownItUses: [[shiki, { theme: 'github-light' }]]
    }),
    MarkdownPreview({
      shiki: {
        theme: 'github-light'
      }
    })
  ],
  server: {
    open: '/',
    host: '0.0.0.0'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DForm',
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
