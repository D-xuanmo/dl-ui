import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, pickProps, SizeEnum } from '@xuanmo/dl-common'

export type SwitchProps = ExtractPropTypes<typeof SWITCH_PROPS>

export const SWITCH_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
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
