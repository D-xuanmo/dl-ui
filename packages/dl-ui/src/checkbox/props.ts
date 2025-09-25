import { COMMON_PROPS, pickProps } from '@xuanmo/dl-common'
import { ExtractPropTypes, PropType, VNode } from 'vue'

export type CheckboxProps = ExtractPropTypes<typeof CHECKBOX_PROPS>

export const CHECKBOX_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  label: [String, Function] as PropType<string | VNode>,
  defaultChecked: Boolean,
  name: String
}
