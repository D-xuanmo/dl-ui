import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType, HorizontalAlignType } from '@xuanmo/dl-common'

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
  },
  layout: String as PropType<DirectionType>,
  border: {
    type: Boolean,
    default: undefined
  }
}
