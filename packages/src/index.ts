import { App } from 'vue'
import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'
import { FormGlobalConfigType, GLOBAL_CONFIG_KEY, CELL_GROUP_KEY } from './context'
import { LABEL_WIDTH } from './constants'

const install = function (app: App, options?: FormGlobalConfigType) {
  const config = {
    hideLabel: false,
    labelWidth: LABEL_WIDTH,
    zIndex: 2000,
    ...(options ?? {})
  }
  app.provide(GLOBAL_CONFIG_KEY, config)
  app.provide(CELL_GROUP_KEY, {})
  app.config.globalProperties.$DForm = config
  Object.values(components).forEach((component) => {
    app.use(component)
  })
}

export * from './components'
export * from './common'
export default { install }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $DForm: FormGlobalConfigType
  }
}
