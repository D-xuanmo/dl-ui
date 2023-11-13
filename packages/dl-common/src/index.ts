import { App } from 'vue'
import { version as commonVersion } from '../package.json'

import * as components from './components'

import { color } from './utils'

import './style/index.scss'

// 引入图标样式
import '../../dl-icons/src/style.scss'

const install = function (app: App) {
  Object.values(components).forEach((component: any) => {
    if (/^d-/.test(component?.name)) app.use(component)
  })
}

color.generatePrimaryColors()
color.generateSuccessColors()
color.generateWarningColors()
color.generateErrorColors()

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

export { commonVersion }

export default { install, version: commonVersion }
