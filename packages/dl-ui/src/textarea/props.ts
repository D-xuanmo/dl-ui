import { ExtractPropTypes } from 'vue'
import { COMMON_PROPS, pickProps } from '@xuanmo/dl-common'

export type TextareaProps = ExtractPropTypes<typeof TEXTAREA_PROPS>

export const TEXTAREA_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
  modelValue: String,
  maxlength: Number,
  rows: {
    type: Number,
    default: 3
  },
  placeholder: {
    type: String,
    default: ''
  },
  showWordLimit: Boolean,
  autosize: Boolean
}
