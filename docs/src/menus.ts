import { createRandomID } from '@xuanmo/javascript-utils'
import { MenuItemType } from './components/menu/types'

const menus: MenuItemType[] = [
  {
    id: createRandomID(),
    groupTitle: '组件开发指南',
    children: [
      { id: 'guide', path: '/guide', content: 'Guide [开发指南]' },
      { id: 'example', path: '/example', content: 'Example [描述文字]' },
      { id: 'example-bem', path: '/example-bem', content: 'BEM [示例]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '基础组件',
    children: [
      { id: 'button', path: '/button', content: 'Button [按钮]' },
      { id: 'cell', path: '/cell', content: 'Cell [单元格]' },
      { id: 'icon', path: '/icon', content: 'Icon [图标]' },
      { id: 'overlay', path: '/overlay', content: 'Overlay [遮罩层]' },
      { id: 'popup', path: '/popup', content: 'Popup [弹出层]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '表单组件',
    children: [
      { id: 'input', path: '/input', content: 'Input [输入框]' },
      { id: 'switch', path: '/switch', content: 'Switch [开关]' },
      { id: 'rate', path: '/rate', content: 'Rate [评分]' },
      { id: 'picker', path: '/picker', content: 'Picker [选择器]' },
      { id: 'date-picker', path: '/date-picker', content: 'DatePicker [日期选择器]' },
      { id: 'radio', path: '/radio', content: 'Radio [单选框]' },
      { id: 'checkbox', path: '/checkbox', content: 'Checkbox [复选框]' }
    ]
  }
]

/**
 * 查找菜单信息
 * @param id
 */
export const findMenuById = (id: string) => {
  let menu: unknown = {}
  for (let i = 0; i < menus.length; i++) {
    const children = menus[i].children
    if (children) {
      for (let j = 0; j < children.length; j++) {
        if (children[j].id === id) {
          menu = children[j]
          break
        }
      }
    }
  }
  return menu as MenuItemType
}

export default menus
