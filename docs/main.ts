import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import DForm from '@'

// 引入 CSS 相关资源
import 'vite-plugin-vuedoc/style.css'
import 'github-markdown-css'
import './assets/style/index.scss'

const app = createApp(App)

app.use(routes).use(DForm).mount('#app')
