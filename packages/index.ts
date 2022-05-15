import { App } from 'vue'
import { Example, ExampleBEM } from './example'

import './style/index.scss'

export default {
  install(app: App) {
    app.use(Example)
    app.use(ExampleBEM)
  }
}
