import { App } from 'vue'
import { FormGlobalConfigType, globalConfigKey } from './constants/context'
import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'
export * from './components'

export default {
  install(app: App, options?: FormGlobalConfigType) {
    app.provide(globalConfigKey, {
      hideLabel: false,
      labelWidth: '80px',
      ...(options ?? {})
    })
    Object.values(components).forEach((component) => {
      app.use(component)
    })
  }
}
