import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'
import { pickProps } from '../utils'

export type CellProps = ExtractPropTypes<typeof CELL_PROPS>

export const CELL_PROPS = {
  ...pickProps(COMMON_PROPS, ['requiredMarkPosition', 'clientType', 'border', 'round']),
  title: String,
  titleClass: String,
  titleWidth: [String, Number],
  titleAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: 'left'
  },
  /**
   * 标题垂直居中
   */
  titleVerticalCenter: {
    type: Boolean,
    default: false
  },
  hideTitle: Boolean,
  required: Boolean,
  content: String as PropType<string | undefined>,
  contentClass: String,
  contentAlign: String as PropType<HorizontalAlignType>,
  disabled: Boolean,
  suffix: String,
  description: String,
  arrow: Boolean,
  layout: String as PropType<DirectionType | undefined>
}
