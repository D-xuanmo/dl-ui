import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import DForm from '@'

// 引入 CSS 相关资源
import '@xuanmo/vite-plugin-vuedoc/style.css'
import './assets/style/index.scss'
import DocPreview from '@doc/components/preview'

const app = createApp(App)

app
  .use(routes)
  .use(DForm, {
    theme: 'light'
  })
  .component('DocPreview', DocPreview)
  .mount('#app')
