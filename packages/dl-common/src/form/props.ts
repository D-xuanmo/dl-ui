import { ExtractPropTypes, PropType } from 'vue'
import { FormModels } from './types'
import type { FormStore } from './store'
import { COMMON_PROPS, DirectionType } from '../common'
import { pickProps } from '../utils'

export type FormProps = ExtractPropTypes<typeof FORM_PROPS>

export const FORM_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly', 'requiredMarkPosition', 'labelWidth']),
  /**
   * 表单模型
   */
  models: {
    type: Array as PropType<FormModels>,
    required: true,
    default: () => []
  },

  /**
   * 表单 FormStore
   */
  store: Object as Required<PropType<FormStore>>,

  /**
   * 标题布局类型
   */
  layout: String as PropType<DirectionType>,

  /**
   * 是否隐藏标题
   */
  hideLabel: Boolean,

  /**
   * 显示圆角
   */
  round: {
    type: Boolean,
    default: true
  },

  /**
   * 显示边框
   */
  border: {
    type: Boolean,
    default: undefined
  },

  /**
   * 是否显示背景
   */
  hasBackground: {
    type: Boolean,
    default: true
  },

  /**
   * 是否显示冒号
   */
  colon: {
    type: Boolean,
    default: undefined
  },

  /**
   * 终端类型
   */
  clientType: {
    type: String as PropType<'PC' | 'MOBILE'>,
    default: 'PC'
  }
}
