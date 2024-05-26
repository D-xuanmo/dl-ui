import { ExtractPropTypes, PropType } from 'vue'
import {
  COMMON_PROPS,
  FieldFormatterTrigger,
  HorizontalAlignType,
  pickProps
} from '@xuanmo/dl-common'

export type InputProps = ExtractPropTypes<typeof INPUT_PROPS>

export const INPUT_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly', 'rowId', 'model']),
  modelValue: {
    type: [String, Number] as PropType<string | number | undefined>,
    default: undefined
  },
  type: {
    type: String as PropType<'text' | 'number' | 'password' | 'email' | 'url'>,
    default: 'text'
  },
  name: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  inputAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: 'left'
  },
  maxlength: {
    type: Number,
    default: -1
  },
  autocomplete: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  formatter: {
    type: Function as PropType<(value: string | number | undefined) => string>,
    default: null
  },
  formatterTrigger: {
    type: String as PropType<FieldFormatterTrigger | undefined>,
    default: 'onChange'
  },
  border: {
    type: Boolean,
    default: false
  },
  status: {
    type: String as PropType<'warning' | 'error'>,
    default: undefined
  }
}
