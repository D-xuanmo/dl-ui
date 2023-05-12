import { createRandomID, ua } from '@xuanmo/javascript-utils'
import { MenuItemType } from './components/menu/types'

const menus: MenuItemType[] = [
  {
    id: 'docs',
    hide: ua().device === 'Mobile',
    groupTitle: '开发指南',
    children: [
      { id: 'introduce', path: '/docs/introduce', content: '介绍' },
      { id: 'quick', path: '/docs/quick', content: '快速上手' },
      { id: 'common', path: '/docs/common', content: '全局说明' },
      { id: 'custom', path: '/docs/custom', content: '自定义能力' },
      { id: 'questions', path: '/docs/questions', content: '常见问题' },
      { id: 'guide', path: '/docs/guide', content: '项目规范' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '基础组件',
    children: [
      { id: 'button', path: '/components/button', content: 'Button [按钮]' },
      { id: 'cell', path: '/components/cell', content: 'Cell [单元格]' },
      { id: 'icon', path: '/components/icon', content: 'Icon [图标]' },
      { id: 'overlay', path: '/components/overlay', content: 'Overlay [遮罩层]' },
      { id: 'popup', path: '/components/popup', content: 'Popup [弹出层]' },
      { id: 'space', path: '/components/space', content: 'Space [间距]' },
      { id: 'image', path: '/components/image', content: 'Image [图片]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '表单组件',
    children: [
      { id: 'input', path: '/components/input', content: 'Input [输入框]' },
      { id: 'textarea', path: '/components/textarea', content: 'Textarea [多行文本框]' },
      { id: 'switch', path: '/components/switch', content: 'Switch [开关]' },
      { id: 'rate', path: '/components/rate', content: 'Rate [评分]' },
      { id: 'picker', path: '/components/picker', content: 'Picker [选择器]' },
      { id: 'cascader', path: '/components/cascader', content: 'Cascader [级联选择]' },
      {
        id: 'date-picker',
        path: '/components/date-picker',
        content: 'DatePicker [日期时间]'
      },
      { id: 'radio', path: '/components/radio', content: 'Radio [单选框]' },
      { id: 'checkbox', path: '/components/checkbox', content: 'Checkbox [复选框]' },
      { id: 'upload', path: '/components/upload', content: 'Upload [文件上传]' },
      { id: 'form', path: '/components/form', content: 'Form [表单]' }
    ]
  }
]

export const getMenuList = () => menus.filter((item) => !item.hide)

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
