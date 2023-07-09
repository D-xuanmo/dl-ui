import { App } from 'vue'
import * as components from './components'

// 引入所有 common 包组件
import { install as commonInstall, ComponentNames as CommonComponentNames } from '@xuanmo/dl-common'

// 引入公用样式
import '../../dl-common/src/style/index.scss'

// 引入图标样式
import '@xuanmo/dl-icons/dist/index.css'

// 引入 UI 所有样式
import './style/index.scss'

const install = function (app: App) {
  Object.values(components).forEach((component: any) => {
    if (/^d-/.test(component?.name)) app.use(component)
  })
  app.use(commonInstall)
}

export type ComponentNames = CommonComponentNames & keyof typeof components extends infer T
  ? T extends `D${infer Name}`
    ? `D${Name}`
    : never
  : never

export * from './components'
export * from '@xuanmo/dl-common'
export { version } from '../package.json'
export default { install }
