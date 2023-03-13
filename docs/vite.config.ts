import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import shiki from 'markdown-it-shiki'
import Markdown from 'vite-plugin-md'
import MarkdownPreview, { transformer } from '@xuanmo/vite-plugin-md-preview'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(join(__dirname, '../packages/src/icon/icons'))],
      // 指定symbolId格式
      symbolId: 'd-icon-[name]',
      customDomId: '__d_svg__icons__dom__'
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown({
      transforms: {
        before: transformer
      },
      markdownItUses: [[shiki, { theme: 'min-light' }]]
    }),
    MarkdownPreview({
      shiki: {
        theme: 'vitesse-light'
      }
    })
  ],
  server: {
    open: '/',
    host: '0.0.0.0',
    port: 3200,
    proxy: {
      '/api': 'http://127.0.0.1:7001'
    }
  },
  resolve: {
    alias: {
      '@': resolve(join(__dirname, '../packages/src')),
      '@doc': resolve(__dirname, 'src')
    }
  }
})
