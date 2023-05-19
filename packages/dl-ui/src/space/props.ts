import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType } from '../common'

export type SpaceJustifyType = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export type SpaceAlignType = 'start' | 'center' | 'end' | 'baseline'

export type SpaceProps = ExtractPropTypes<typeof SPACE_PROPS>

export const SPACE_PROPS = {
  /**
   * 间隙，单位：px
   */
  gap: {
    type: Number,
    default: 0
  },

  /**
   * 排列方式，水平、垂直
   */
  direction: {
    type: String as PropType<DirectionType>,
    default: 'horizontal'
  },

  /**
   * 水平排列对齐方式
   */
  justify: {
    type: String as PropType<SpaceJustifyType>,
    default: undefined
  },

  /**
   * 垂直排列对齐方式
   */
  align: {
    type: String as PropType<SpaceAlignType>,
    default: undefined
  },

  /**
   * 是否自动换行，水平时生效
   */
  wrap: {
    type: Boolean,
    default: false
  }
}
