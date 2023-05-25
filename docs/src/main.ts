import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import DLUI, { validator } from '@xuanmo/dl-ui'
import IconsPreview from './components/icons-preview'
import DemoBlock from './components/demo-block'
import DocPreview from './components/preview'
import MultiColumns from './components/preview/multi-columns'
import Markdown from './components/markdown'

// 引入 CSS 相关资源
import '@xuanmo/normalize.css/class.scss'
import './assets/style/index.scss'

// 引入校验国际化词条
import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validator.localize(zhCN)

import CustomInput from './components/example/custom-input.vue'

const app = createApp(App)

app
  .use(routes)
  .use(DemoBlock)
  .use(DLUI)
  .component('VueCode', DocPreview)
  .component('VueMarkdown', MultiColumns)
  .component('CustomInput', CustomInput)
  .component('IconsPreview', IconsPreview)
  .component('Markdown', Markdown)
  .mount('#app')
