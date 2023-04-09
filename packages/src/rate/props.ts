import { ExtractPropTypes, PropType } from 'vue'
import { SizeType, COMMON_PROPS } from '../common'

export type RateProps = ExtractPropTypes<typeof RATE_PROPS>

export const RATE_PROPS = {
  ...COMMON_PROPS,
  value: {
    type: Number,
    default: undefined
  },
  modelValue: {
    type: Number,
    default: undefined
  },

  /**
   * 显示个数
   */
  count: {
    type: Number,
    default: 5
  },

  /**
   * 图标大小
   */
  size: {
    type: String as PropType<SizeType | string>,
    default: 'medium'
  },

  /**
   * 图标间距
   */
  gap: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: 4
  },

  /**
   * 选中的图标
   */
  checkedIcon: {
    type: String,
    default: 'star-f'
  },

  /**
   * 未选中的图标
   */
  uncheckedIcon: {
    type: String,
    default: 'star'
  },

  /**
   * 选中时图标颜色
   */
  activeColor: {
    type: String,
    default: 'rgb(250, 200, 0)'
  },

  /**
   * 是否允许反选清空
   */
  allowClear: {
    type: Boolean,
    default: true
  }
}
