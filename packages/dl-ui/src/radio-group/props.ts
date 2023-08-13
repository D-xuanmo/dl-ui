import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, IData, DirectionType, pickProps } from '@xuanmo/dl-common'

export type RadioGroupProps = ExtractPropTypes<typeof RADIO_GROUP_PROPS>

export const RADIO_GROUP_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
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
