import { App } from 'vue'
import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'
import { GlobalConfigType, GLOBAL_CONFIG_CONTEXT_KEY } from './context'

const install = function (app: App, options?: GlobalConfigType) {
  const config: GlobalConfigType = {
    zIndex: 2000,
    ...options
  }
  app.provide(GLOBAL_CONFIG_CONTEXT_KEY, config)
  app.config.globalProperties.$DLUI = config
  Object.values(components).forEach((component) => {
    if (/^d-/.test(component.name)) app.use(component as any)
  })
}

export type ComponentNames = keyof typeof components extends infer T
  ? T extends `D${infer Name}`
    ? `D${Name}`
    : never
  : never

export * from './components'
export * from './common'
export * from './utils'
export * from './validator'
export { version } from '../package.json'
export default { install }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $DLUI: GlobalConfigType
  }
}
