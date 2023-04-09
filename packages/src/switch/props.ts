import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, SizeType } from '../common'

export type SwitchProps = ExtractPropTypes<typeof SWITCH_PROPS>

export const SWITCH_PROPS = {
  ...COMMON_PROPS,
  value: {
    type: Boolean,
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  size: {
    type: String as PropType<SizeType>,
    default: 'medium'
  },
  loading: Boolean,
  round: {
    type: Boolean,
    default: true
  },
  beforeChange: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null
  }
}
