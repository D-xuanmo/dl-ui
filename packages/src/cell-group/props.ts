import { ExtractPropTypes, PropType } from 'vue'

export type CellGroupProps = ExtractPropTypes<typeof CELL_GROUP_PROPS>

export const CELL_GROUP_PROPS = {
  title: String as PropType<string | undefined>,
  round: {
    type: Boolean,
    default: true
  },
  cellTitleWidth: String
}
