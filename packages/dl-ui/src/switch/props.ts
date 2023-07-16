import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, SizeEnum } from '@xuanmo/dl-common'

export type SwitchProps = ExtractPropTypes<typeof SWITCH_PROPS>

export const SWITCH_PROPS = {
  ...COMMON_PROPS,
  modelValue: {
    type: Boolean,
    default: undefined
  },
  size: {
    type: String as PropType<SizeEnum>,
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
