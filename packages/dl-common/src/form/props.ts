import { ExtractPropTypes, PropType } from 'vue'
import { FormModels } from './types'
import type { FormStore } from './store'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'
import { pickProps } from '../utils'
import { LABEL_WIDTH } from '../constants'

export type FormProps = ExtractPropTypes<typeof FORM_PROPS>

export const FORM_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly']),
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
  store: Object as PropType<FormStore>,

  /**
   * 表单宽度
   */
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: LABEL_WIDTH
  },

  /**
   * 标题布局类型
   */
  layout: {
    type: String as PropType<DirectionType>,
    default: 'horizontal'
  },

  /**
   * 是否显示冒号
   */
  colon: {
    type: Boolean,
    default: undefined
  },

  /**
   * 必填标识位置
   */
  requiredMarkPosition: {
    type: String as PropType<Exclude<HorizontalAlignType, 'center'>>,
    default: 'right'
  },

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
   * 是否显示背景
   */
  hasBackground: {
    type: Boolean,
    default: true
  },

  /**
   * 终端类型
   */
  clientType: {
    type: String as PropType<'PC' | 'MOBILE'>,
    default: 'PC'
  }
}
