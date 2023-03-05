import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import DForm from '@'

import { Example, ExampleBEM } from './components/example'
import DemoBlock from './components/demo-block'

// 引入 CSS 相关资源
import '@xuanmo/normalize.css/class.scss'
import './assets/style/index.scss'
import DocPreview from '@doc/components/preview'

const app = createApp(App)

app
  .use(routes)
  .use(Example)
  .use(ExampleBEM)
  .use(DemoBlock)
  .use(DForm, {
    theme: 'light'
  })
  .component('VueCode', DocPreview)
  .mount('#app')
