import { Component, ExtractPropTypes, PropType } from 'vue'
import { FieldFormatterTrigger, HorizontalAlignType, SizeType } from '@xuanmo/dl-common'

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

  // label 相关参数
  label: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: ''
  },
  labelAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: 'left'
  },
  hideLabel: Boolean,
  leftIcon: {
    type: [Function, String] as PropType<Component>,
    default: undefined
  },
  leftIconProps: {
    type: Object,
    default: () => ({})
  },
  colon: Boolean,
  required: Boolean,

  // 内容相关参数
  placeholder: {
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
  suffix: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: ''
  },
  clearable: Boolean,

  formatter: {
    type: Function as PropType<(value: string | number | undefined) => string>,
    default: null
  },
  formatterTrigger: {
    type: String as PropType<FieldFormatterTrigger | undefined>,
    default: 'onChange'
  }
}
