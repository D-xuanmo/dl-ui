import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType, HorizontalAlignType } from '../common'

export type CellGroupProps = ExtractPropTypes<typeof CELL_GROUP_PROPS>

export const CELL_GROUP_PROPS = {
  title: String as PropType<string | undefined>,
  round: {
    type: Boolean,
    default: true
  },
  cellTitleWidth: String,
  cellContentAlign: String as PropType<HorizontalAlignType>,
  layout: String as PropType<DirectionType>,
  border: {
    type: Boolean,
    default: undefined
  }
}
