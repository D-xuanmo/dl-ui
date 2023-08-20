import { ExtractPropTypes, PropType } from 'vue'
import { SizeEnum, ThemeEnum } from '../common'

export type ButtonProps = ExtractPropTypes<typeof BUTTON_PROPS>

export const BUTTON_PROPS = {
  /**
   * 主题分类
   */
  theme: {
    type: String as PropType<ThemeEnum>,
    default: 'default'
  },

  /**
   * 按钮大小
   */
  size: {
    type: String as PropType<SizeEnum>,
    default: 'medium'
  },

  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * 是否为块级元素
   */
  block: Boolean,

  /**
   * 填充模式
   */
  fill: {
    type: String as PropType<'solid' | 'outline' | 'none'>,
    default: 'solid'
  },

  /**
   * 按钮形状
   */
  shape: {
    type: String as PropType<'default' | 'round' | 'rectangular'>,
    default: 'default'
  },

  /**
   * 是否显示 loading 效果
   */
  loading: Boolean,

  /**
   * 链接模式
   */
  link: Boolean,

  /**
   * 虚线模式
   */
  dashed: {
    type: Boolean,
    default: false
  },

  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: () => {}
  }
}
