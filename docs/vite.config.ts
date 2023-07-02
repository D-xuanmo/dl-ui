import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import shiki from 'markdown-it-shiki'
import Markdown from 'vite-plugin-md'
import MarkdownPreview, { transformer } from '@xuanmo/vite-plugin-md-preview'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown({
      transforms: {
        before: transformer
      },
      markdownItUses: [[shiki, { theme: 'vitesse-light' }]]
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
      '/api': 'https://www.xuanmo.xin'
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@xuanmo/dl-ui': resolve(join(__dirname, '../packages/dl-ui/src')),
      '@xuanmo/dl-common': resolve(join(__dirname, '../packages/dl-common/src')),
      '@doc': resolve(__dirname, 'src')
    }
  }
})
