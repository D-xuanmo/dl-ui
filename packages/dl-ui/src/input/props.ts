import { ExtractPropTypes, PropType } from 'vue'
import { FieldFormatterTrigger, HorizontalAlignType } from '@xuanmo/dl-common'

export type InputProps = ExtractPropTypes<typeof INPUT_PROPS>

export const INPUT_PROPS = {
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
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
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
  clearable: Boolean,
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
  }
}
