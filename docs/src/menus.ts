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
          { id: 'dl-cli', path: '/docs/dl-cli', content: 'dl-cli 脚手架' },
          { id: 'common', path: '/docs/common', content: '全局说明' },
          { id: 'custom', path: '/docs/custom', content: '自定义能力' },
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
        groupTitle: '全局配置',
        children: [
          {
            id: 'dialog',
            path: '/comp-common/config-provider',
            content: 'ConfigProvider [全局化配置]'
          }
        ]
      },
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
        groupTitle: '表单',
        children: [{ id: 'form', path: '/comp-common/form', content: 'Form [表单]' }]
      },
      {
        id: createRandomID(),
        groupTitle: '布局',
        children: [
          { id: 'cell', path: '/comp-common/cell', content: 'Cell [单元格]' },
          { id: 'grid', path: '/comp-common/grid', content: 'Grid [网格]' },
          { id: 'layout', path: '/comp-common/layout', content: 'Layout [布局]' }
        ]
      },
      {
        id: createRandomID(),
        groupTitle: '反馈',
        children: [
          { id: 'dialog', path: '/comp-common/dialog', content: 'Dialog [对话框]' },
          { id: 'dialog', path: '/comp-common/drawer', content: 'Drawer [抽屉]' },
          { id: 'message', path: '/comp-common/message', content: 'Message [消息提示]' },
          { id: 'loading', path: '/comp-common/loading', content: 'Loading [加载提示]' }
        ]
      },
      {
        id: createRandomID(),
        groupTitle: '组合式 API',
        children: [
          { id: 'hook', path: '/comp-common/hook', content: '介绍' },
          { id: 'use-config', path: '/comp-common/use-config', content: 'useConfig' },
          { id: 'use-form', path: '/comp-common/use-form', content: 'useForm' },
          {
            id: 'use-link-children',
            path: '/comp-common/use-link-children',
            content: 'useLinkChildren'
          },
          {
            id: 'use-form-event',
            path: '/comp-common/use-form-event',
            content: 'useFormEvent'
          }
        ]
      }
    ]
  ],
  [
    'comp-mobile',
    [
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
          { id: 'search', path: '/comp-mobile/search', content: 'Search [搜索]' }
        ]
      },
      {
        id: createRandomID(),
        groupTitle: '导航',
        children: [
          {
            id: 'nav-bar',
            path: '/comp-mobile/nav-bar',
            content: 'NavBar [导航栏]'
          }
        ]
      },
      {
        id: createRandomID(),
        groupTitle: '反馈',
        children: [
          {
            id: 'action-sheet',
            path: '/comp-mobile/action-sheet',
            content: 'ActionSheet [动作面板]'
          },
          { id: 'toast', path: '/comp-mobile/toast', content: 'Toast [轻提示]' }
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
