import { App } from 'vue'
import { version } from '../package.json'

import * as components from './components'

import './style/index.scss'

// 引入图标样式
import '@xuanmo/dl-icons/dist/index.css'

const install = function (app: App) {
  Object.values(components).forEach((component: any) => {
    if (/^d-/.test(component?.name)) app.use(component)
  })
}

export { version }

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

export default { install, version }
