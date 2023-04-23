import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType, HorizontalAlignType, SizeType } from '../common'

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
  leftIcon: String,
  leftIconSize: String as PropType<SizeType | string>,
  leftIconColor: String,
  leftIconProps: Object,

  content: String as PropType<string | undefined>,
  contentClass: String,
  contentAlign: String as PropType<HorizontalAlignType>,
  disabled: Boolean,

  suffix: String,
  desc: String,
  rightIcon: String,
  rightIconSize: String as PropType<SizeType | string>,
  rightIconColor: String,
  rightIconProps: Object,

  arrow: Boolean,
  border: {
    type: Boolean,
    default: undefined
  },
  layout: String as PropType<DirectionType | undefined>
}
