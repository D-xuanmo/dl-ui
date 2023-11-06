import { ExtractPropTypes, PropType } from 'vue'
import { IconProps } from '@xuanmo/dl-icons'
import { DirectionType } from '../common'

export type LoadingProps = ExtractPropTypes<typeof LOADING_PROPS>

export const LOADING_PROPS = {
  /**
   * 是否显示 loading
   */
  loading: {
    type: Boolean,
    default: true
  },

  /**
   * loading 文案描述
   */
  description: {
    type: String,
    default: ''
  },

  /**
   * 延迟显示 loading，单位：毫秒
   */
  delay: {
    type: Number,
    default: 0
  },

  /**
   * 图标大小
   */
  size: {
    type: String as PropType<IconProps['size']>,
    default: <IconProps['size']>'medium'
  },

  /**
   * 布局类型
   */
  layout: {
    type: String as PropType<DirectionType>,
    default: <DirectionType>'vertical'
  },

  /**
   * 全屏显示
   */
  fullScreen: {
    type: Boolean,
    default: false
  },

  /**
   * 全屏状态下禁止滚动穿透
   */
  preventScrollThrough: {
    type: Boolean,
    default: true
  }
}
