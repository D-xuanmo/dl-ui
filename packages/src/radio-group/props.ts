import { ExtractPropTypes, PropType } from 'vue'
import { DirectionType } from '../common'

export type RadioGroupProps = ExtractPropTypes<typeof RADIO_GROUP_PROPS>

export const RADIO_GROUP_PROPS = {
  modelValue: {
    type: [String, Number],
    required: true
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  disabled: Boolean
}
