import { App } from 'vue'
import { version } from '../package.json'

// 引入所有 common 包组件
import DLCommon, { ComponentNames as CommonComponentNames } from '@xuanmo/dl-common'

import * as components from './components'

// 引入公用样式
import '../../dl-common/src/style/index.scss'
import '../../dl-icons/src/style.scss'

// 引入 UI 所有样式
import './style/index.scss'

const install = function (app: App) {
  Object.values(components).forEach((component: any) => {
    if (/^d-/.test(component?.name)) app.use(component)
  })
  app.use(DLCommon)
}

export type ComponentNames = CommonComponentNames & keyof typeof components extends infer T
  ? T extends `D${infer Name}`
    ? `D${Name}`
    : never
  : never

export * from './components'
export * from '@xuanmo/dl-common'
export default { install, version }
