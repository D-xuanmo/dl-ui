import { createRandomID } from '@xuanmo/javascript-utils'
import { MenuItemType } from '../components/menu/types'

const menus: MenuItemType[] = [
  {
    id: createRandomID(),
    groupTitle: '组件开发指南',
    children: [
      { id: createRandomID(), path: '/guide', content: 'Guide [开发指南]' },
      { id: createRandomID(), path: '/example', content: 'Example [描述文字]' },
      { id: createRandomID(), path: '/example-bem', content: 'BEM [示例]' }
    ]
  }
]

export default menus
