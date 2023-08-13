import { ExtractPropTypes, PropType } from 'vue'

export type LayoutSiderProps = ExtractPropTypes<typeof LAYOUT_SIDER_PROPS>
export type LayoutHeaderProps = ExtractPropTypes<typeof LAYOUT_HEADER_PROPS>
export type LayoutFooterProps = ExtractPropTypes<typeof LAYOUT_FOOTER_PROPS>

export const LAYOUT_SIDER_PROPS = {
  width: {
    type: [Number, String],
    default: 200
  },

  border: {
    type: Boolean,
    default: true
  },

  /**
   * 是否开启折叠
   */
  collapsed: {
    type: Boolean,
    default: false
  },

  /**
   * 折叠后宽度
   */
  collapsedWidth: {
    type: Number,
    default: 0
  },

  /**
   * 侧边栏位置
   */
  placement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },

  /**
   * 触发按钮距离顶部距离
   * 默认：50%
   */
  triggerTop: {
    type: [Number, String],
    default: '50%'
  },

  /**
   * 折叠事件
   */
  onCollapsed: {
    type: Function as PropType<(collapsed: boolean) => void>,
    default: undefined
  }
}

export const LAYOUT_HEADER_PROPS = {
  height: {
    type: [Number, String],
    default: 50
  },
  border: {
    type: Boolean,
    default: true
  }
}

export const LAYOUT_FOOTER_PROPS = {
  height: {
    type: [Number, String],
    default: 50
  },
  border: {
    type: Boolean,
    default: true
  }
}
