import { createRandomID, ua } from '@xuanmo/javascript-utils'
import { MenuItemType } from './components/menu/types'

const menus: MenuItemType[] = [
  {
    id: 'introduce',
    hide: ua().device === 'Mobile',
    groupTitle: '介绍',
    children: [{ id: 'introduce', path: '/docs/introduce', content: 'DL UI' }]
  },
  {
    id: 'docs',
    hide: ua().device === 'Mobile',
    groupTitle: '开发指南',
    children: [
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
      { id: 'cell', path: '/components/cell', content: 'Cell [单元格]' },
      {
        id: 'icon',
        path: '/components/icon',
        content: 'Icon [图标]',
        hide: ua().device === 'Mobile'
      },
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
      { id: 'button', path: '/components/button', content: 'Button [按钮]' },
      { id: 'calendar', path: '/components/calendar', content: 'Calendar [日历]' },
      { id: 'cascader', path: '/components/cascader', content: 'Cascader [级联选择]' },
      { id: 'checkbox', path: '/components/checkbox', content: 'Checkbox [复选框]' },
      {
        id: 'date-time-picker',
        path: '/components/date-time-picker',
        content: 'DateTimePicker [日期时间]'
      },
      { id: 'input', path: '/components/input', content: 'Input [输入框]' },
      { id: 'textarea', path: '/components/textarea', content: 'Textarea [文本域]' },
      { id: 'switch', path: '/components/switch', content: 'Switch [开关]' },
      { id: 'picker', path: '/components/picker', content: 'Picker [选择器]' },
      { id: 'rate', path: '/components/rate', content: 'Rate [评分]' },
      { id: 'radio', path: '/components/radio', content: 'Radio [单选框]' },
      { id: 'upload', path: '/components/upload', content: 'Upload [文件上传]' },
      { id: 'form', path: '/components/form', content: 'Form [表单]' }
    ]
  },
  {
    id: createRandomID(),
    groupTitle: '展示组件',
    children: [{ id: 'message', path: '/components/message', content: 'Message [消息提示]' }]
  }
]

export const getMenuList = () => {
  return menus
    .filter((item) => !item.hide)
    .map((item) => {
      item.children = item.children?.filter((child) => !child.hide)
      return item
    })
}

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
