import {
  pickProps,
  COMMON_PROPS,
  FormProps,
  FieldFormatterTrigger,
  HorizontalAlignType
} from '@xuanmo/dl-common'
import { ExtractPropTypes, PropType } from 'vue'

export type SearchProps = ExtractPropTypes<typeof SEARCH_PROPS>

export const SEARCH_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
  modelValue: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: -1
  },
  placeholder: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  inputAlign: {
    type: String as PropType<HorizontalAlignType>,
    default: 'left'
  },
  autocomplete: {
    type: String,
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  formatter: {
    type: Function as PropType<(value: string | number | undefined) => string>,
    default: null
  },
  formatterTrigger: {
    type: String as PropType<FieldFormatterTrigger | undefined>,
    default: 'onChange'
  },

  /**
   * 高级搜索
   */
  advancedSearch: {
    type: Boolean,
    default: false
  },

  /**
   * 高级搜索标题
   */
  advancedSearchTitle: {
    type: String,
    default: '高级搜索'
  },

  /**
   * 搜索重置按钮文字
   */
  searchResetText: {
    type: String,
    default: '重置'
  },

  /**
   * 搜索确认按钮文字
   */
  searchConfirmText: {
    type: String,
    default: '确定'
  },

  /**
   * 高级搜索表单 props
   */
  formProps: {
    type: Object as PropType<Partial<FormProps>>,
    default: undefined
  }
}
