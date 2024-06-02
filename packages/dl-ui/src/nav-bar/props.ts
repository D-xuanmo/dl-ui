import { ExtractPropTypes, PropType } from 'vue'
import { HorizontalAlignType } from '@xuanmo/dl-common'

export type NavBarProps = ExtractPropTypes<typeof NAV_BAR_PROPS>

export const NAV_BAR_PROPS = {
  title: {
    type: String,
    default: ''
  },

  /**
   * 显示返回剪头
   */
  backArrow: {
    type: Boolean,
    default: false
  },

  /**
   * 标题对齐方式
   */
  titleAlign: {
    type: String as PropType<Extract<HorizontalAlignType, 'left' | 'center'>>,
    default: 'center'
  },

  /**
   * 是否显示下边框
   */
  border: {
    type: Boolean,
    default: true
  },

  /**
   * 左侧文字
   */
  leftText: {
    type: String,
    default: ''
  },

  /**
   * 右侧文字
   */
  rightText: {
    type: String,
    default: ''
  },

  /**
   * 按钮高亮
   */
  buttonHighlight: {
    type: Boolean,
    default: true
  }
}
