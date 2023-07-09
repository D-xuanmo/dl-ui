import './style/index.scss'
import { App } from 'vue'

import * as components from './components'

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
export * from './constants'
export * from './utils'
export * from './common'
export * from './hooks'
export * from './validator'

export { install }
