import { ExtractPropTypes, PropType } from 'vue'
import { HorizontalAlignType } from '../common'

export type CellGroupProps = ExtractPropTypes<typeof CELL_GROUP_PROPS>

export const CELL_GROUP_PROPS = {
  title: String as PropType<string | undefined>,
  round: {
    type: Boolean,
    default: true
  },
  cellTitleWidth: String,
  cellContentAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: undefined
  }
}
