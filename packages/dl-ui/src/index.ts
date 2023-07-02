import { App } from 'vue'
import * as components from './components'

// 引入所有 common 包组件
import {
  DGrid,
  DGridItem,
  DMessage,
  DButton,
  DPopup,
  DOverlay,
  DSpace,
  DImage
} from '@xuanmo/dl-common'

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
  app.use(DGrid)
  app.use(DGridItem)
  app.use(DMessage)
  app.use(DButton)
  app.use(DPopup)
  app.use(DOverlay)
  app.use(DSpace)
  app.use(DImage)
}

export type ComponentNames = keyof typeof components extends infer T
  ? T extends `D${infer Name}`
    ? `D${Name}`
    : never
  : never

export * from './components'
export * from '@xuanmo/dl-common'
export * from './validator'
export { version } from '../package.json'
export default { install }
