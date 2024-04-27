import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'
import { pickProps } from '../utils'

export type CellGroupProps = ExtractPropTypes<typeof CELL_GROUP_PROPS>

export const CELL_GROUP_PROPS = {
  ...pickProps(COMMON_PROPS, ['border']),
  title: String as PropType<string | undefined>,
  round: {
    type: Boolean,
    default: true
  },
  cellTitleWidth: String,
  cellContentAlign: String as PropType<HorizontalAlignType>,
  layout: String as PropType<DirectionType>
}
