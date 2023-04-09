import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import DForm, { validator } from '@'

import { Example, ExampleBEM } from './components/example'
import DemoBlock from './components/demo-block'

// 引入 CSS 相关资源
import '@xuanmo/normalize.css/class.scss'
import './assets/style/index.scss'
import DocPreview from '@doc/components/preview'

import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validator.localize(zhCN)

const app = createApp(App)

app
  .use(routes)
  .use(Example)
  .use(ExampleBEM)
  .use(DemoBlock)
  .use(DForm)
  .component('VueCode', DocPreview)
  .mount('#app')
