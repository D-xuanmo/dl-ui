import { App } from 'vue'
import { Example, ExampleBEM } from './example'
import { FormGlobalConfigType, globalConfigKey } from '@/constants/context'
import './style/index.scss'

export default {
  install(app: App, options?: FormGlobalConfigType) {
    app.use(Example)
    app.use(ExampleBEM)
    app.provide(globalConfigKey, options)
  }
}
