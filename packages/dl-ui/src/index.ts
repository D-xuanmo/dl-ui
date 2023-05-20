import { App } from 'vue'
// import 'virtual:svg-icons-register'
import * as components from './components'
import '@xuanmo/dl-common/dist/index.css'
import './style/index.scss'

const install = function (app: App) {
  Object.values(components).forEach((component: any) => {
    if (/^d-/.test(component?.name)) app.use(component)
  })
}

export type ComponentNames = keyof typeof components extends infer T
  ? T extends `D${infer Name}`
    ? `D${Name}`
    : never
  : never

export * from './components'
export * from './common'
export * from './validator'
export { version } from '../package.json'
export default { install }
