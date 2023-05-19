import { App } from 'vue'
// import 'virtual:svg-icons-register'
import './style/index.scss'
import * as components from './components'

const install = function (app: App) {
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
export * as utils from './utils'
export * from './validator'
export { version } from '../package.json'
export default { install }
