import { App } from 'vue'
import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'
import { FormGlobalConfigType, GLOBAL_CONFIG_CONTEXT_KEY, CELL_GROUP_CONTEXT_KEY } from './context'
import { LABEL_WIDTH } from './constants'
import pkg from '../package.json'

const install = function (app: App, options?: FormGlobalConfigType) {
  const config = {
    hideLabel: false,
    labelWidth: LABEL_WIDTH,
    zIndex: 2000,
    ...(options ?? {})
  }
  app.provide(GLOBAL_CONFIG_CONTEXT_KEY, config)
  app.provide(CELL_GROUP_CONTEXT_KEY, {})
  app.config.globalProperties.$DForm = config
  Object.values(components).forEach((component) => {
    app.use(component)
  })
}

export * from './components'
export * from './common'
export * from './utils'
export const version = pkg.version
export default { install }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $DForm: FormGlobalConfigType
  }
}
