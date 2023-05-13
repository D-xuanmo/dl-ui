import { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common'

export type TextareaProps = ExtractPropTypes<typeof TEXTAREA_PROPS>

export const TEXTAREA_PROPS = {
  ...COMMON_PROPS,
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
