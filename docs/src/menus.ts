import { createRandomID } from '@xuanmo/javascript-utils'
import { MenuItemType } from './components/menu/types'

const menus: MenuItemType[] = [
  {
    id: createRandomID(),
    groupTitle: '开发指南',
    children: [
      { id: 'introduce', path: '/introduce', content: '介绍' },
      { id: 'quick', path: '/quick', content: '快速上手' },
      { id: 'common', path: '/common', content: '全局说明' },
      { id: 'custom', path: '/custom', content: '自定义能力' },
      { id: 'questions', path: '/questions', content: '常见问题' },
      { id: 'guide', path: '/guide', content: '项目规范' }
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
      { id: 'popup', path: '/popup', content: 'Popup [弹出层]' },
      { id: 'space', path: '/space', content: 'Space [间距]' },
      { id: 'image', path: '/image', content: 'Image [图片]' }
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
      {
        id: 'date-picker',
        path: '/date-picker',
        content: 'DatePicker [日期选择器]'
      },
      { id: 'radio', path: '/radio', content: 'Radio [单选框]' },
      { id: 'checkbox', path: '/checkbox', content: 'Checkbox [复选框]' },
      { id: 'upload', path: '/upload', content: 'Upload [文件上传]' },
      { id: 'form', path: '/form', content: 'Form [表单]' }
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
