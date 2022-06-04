import { createRandomID } from '@xuanmo/javascript-utils'
import { MenuItemType } from './components/menu/types'

const menus: MenuItemType[] = [
  {
    id: createRandomID(),
    groupTitle: '组件开发指南',
    children: [
      { id: createRandomID(), path: '/guide', content: 'Guide [开发指南]' },
      { id: createRandomID(), path: '/example', content: 'Example [描述文字]' },
      { id: createRandomID(), path: '/example-bem', content: 'BEM [示例]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '基础组件',
    children: [
      { id: createRandomID(), path: '/cell', content: 'Cell [单元格]' },
      { id: createRandomID(), path: '/icon', content: 'Icon [图标]' },
      { id: createRandomID(), path: '/overlay', content: 'Overlay [遮罩层]' },
      { id: createRandomID(), path: '/popup', content: 'Popup [弹出层]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '表单组件',
    children: [
      { id: createRandomID(), path: '/input', content: 'Input [输入框]' },
      { id: createRandomID(), path: '/switch', content: 'Switch [开关]' }
    ]
  }
]

export default menus