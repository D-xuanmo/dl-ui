import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, IData, DirectionType } from '../common'

export type RadioGroupProps = ExtractPropTypes<typeof RADIO_GROUP_PROPS>

export const RADIO_GROUP_PROPS = {
  ...COMMON_PROPS,
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array as PropType<Array<IData> | undefined>,
    default: undefined
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  }
}
