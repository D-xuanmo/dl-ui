import { ExtractPropTypes, FunctionalComponent, PropType } from 'vue'
import { SizeEnum, COMMON_PROPS } from '@xuanmo/dl-common'
import { StarFilled, StarOutlined } from '@xuanmo/dl-icons'

export type RateProps = ExtractPropTypes<typeof RATE_PROPS>

export const RATE_PROPS = {
  ...COMMON_PROPS,
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
    type: String as PropType<SizeEnum | string>,
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
    type: Function as PropType<FunctionalComponent>,
    default: StarFilled
  },

  /**
   * 未选中的图标
   */
  uncheckedIcon: {
    type: Function as PropType<FunctionalComponent>,
    default: StarOutlined
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
