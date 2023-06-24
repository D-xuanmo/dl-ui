import { createRandomID, ua } from '@xuanmo/utils'
import { MenuItemType } from './components/menu/types'
import { RoutePath } from '@doc/env'

const menuMap: Map<RoutePath, MenuItemType[]> = new Map([
  [
    'docs',
    [
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
      }
    ]
  ],
  [
    'comp-common',
    [
      {
        id: createRandomID(),
        groupTitle: '基础',
        children: [
          { id: 'button', path: '/comp-common/button', content: 'Button [按钮]' },
          {
            id: 'icon',
            path: '/comp-common/icon',
            content: 'Icon [图标]',
            hide: ua().device === 'Mobile'
          },
          { id: 'overlay', path: '/comp-common/overlay', content: 'Overlay [遮罩层]' },
          { id: 'popup', path: '/comp-common/popup', content: 'Popup [弹出层]' },
          { id: 'space', path: '/comp-common/space', content: 'Space [间距]' },
          { id: 'image', path: '/comp-common/image', content: 'Image [图片]' }
        ]
      },
      {
        id: createRandomID(),
        groupTitle: '布局',
        children: [{ id: 'grid', path: '/comp-common/grid', content: 'Grid [网格]' }]
      },
      {
        id: createRandomID(),
        groupTitle: '反馈',
        children: [{ id: 'message', path: '/comp-common/message', content: 'Message [消息提示]' }]
      }
    ]
  ],
  [
    'comp-mobile',
    [
      {
        id: createRandomID(),
        groupTitle: '布局',
        children: [{ id: 'cell', path: '/comp-mobile/cell', content: 'Cell [单元格]' }]
      },
      {
        id: createRandomID(),
        groupTitle: '表单',
        children: [
          { id: 'calendar', path: '/comp-mobile/calendar', content: 'Calendar [日历]' },
          { id: 'cascader', path: '/comp-mobile/cascader', content: 'Cascader [级联选择]' },
          { id: 'checkbox', path: '/comp-mobile/checkbox', content: 'Checkbox [复选框]' },
          {
            id: 'date-time-picker',
            path: '/comp-mobile/date-time-picker',
            content: 'DateTimePicker [日期时间]'
          },
          { id: 'input', path: '/comp-mobile/input', content: 'Input [输入框]' },
          { id: 'textarea', path: '/comp-mobile/textarea', content: 'Textarea [文本域]' },
          { id: 'switch', path: '/comp-mobile/switch', content: 'Switch [开关]' },
          { id: 'picker', path: '/comp-mobile/picker', content: 'Picker [选择器]' },
          { id: 'rate', path: '/comp-mobile/rate', content: 'Rate [评分]' },
          { id: 'radio', path: '/comp-mobile/radio', content: 'Radio [单选框]' },
          { id: 'upload', path: '/comp-mobile/upload', content: 'Upload [文件上传]' },
          { id: 'form', path: '/comp-mobile/form', content: 'Form [表单]' }
        ]
      }
    ]
  ]
])

export const getMenuList = (path: RoutePath = 'docs') => {
  return (
    menuMap
      .get(path)
      ?.filter((item) => !item.hide)
      .map((item) => {
        item.children = item.children?.filter((child) => !child.hide)
        return item
      }) ?? []
  )
}
