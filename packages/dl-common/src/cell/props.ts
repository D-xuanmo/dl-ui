import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType, HorizontalAlignType } from '../common'

export type CellProps = ExtractPropTypes<typeof CELL_PROPS>

export const CELL_PROPS = {
  title: String,
  titleClass: String,
  titleWidth: [String, Number],
  titleAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: 'left'
  },
  hideTitle: Boolean,
  required: Boolean,
  requiredMarkPosition: String as PropType<Exclude<HorizontalAlignType, 'center'>>,

  content: String as PropType<string | undefined>,
  contentClass: String,
  contentAlign: String as PropType<HorizontalAlignType>,
  disabled: Boolean,

  suffix: String,
  description: String,

  arrow: Boolean,
  border: {
    type: Boolean,
    default: undefined
  },
  layout: String as PropType<DirectionType | undefined>
}
