import { App } from 'vue'
import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'
import { FormGlobalConfigType, globalConfigKey } from './context/global'
import { LABEL_WIDTH } from './constants'

const install = function (app: App, options?: FormGlobalConfigType) {
  const config = {
    hideLabel: false,
    labelWidth: LABEL_WIDTH,
    zIndex: 2000,
    ...(options ?? {})
  }
  app.provide(globalConfigKey, config)
  app.config.globalProperties.$DForm = config
  Object.values(components).forEach((component) => {
    app.use(component)
  })
}

export * from './components'
export default { install }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $DForm: FormGlobalConfigType
  }
}
