import { ExtractPropTypes, PropType } from 'vue'
import { DataType, DirectionType } from '../common'

export type RadioGroupProps = ExtractPropTypes<typeof RADIO_GROUP_PROPS>

export const RADIO_GROUP_PROPS = {
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array as PropType<Array<DataType> | undefined>,
    default: undefined
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  disabled: Boolean
}
