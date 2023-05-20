import { COMMON_PROPS } from '@xuanmo/dl-common'
import { ExtractPropTypes, PropType } from 'vue'

export type CheckboxProps = ExtractPropTypes<typeof CHECKBOX_PROPS>

export const CHECKBOX_PROPS = {
  ...COMMON_PROPS,
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  label: String,
  defaultChecked: Boolean,
  name: String
}
