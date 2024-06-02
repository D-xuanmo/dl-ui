import { ExtractPropTypes, PropType } from 'vue'
import { FormModels } from './types'
import type { FormStore } from './store'
import { COMMON_PROPS, DirectionType } from '../common'
import { pickProps } from '../utils'
import { ViewLinkageType } from './store'
import { CellProps } from '../cell'

export type FormProps = ExtractPropTypes<typeof FORM_PROPS>

export const FORM_PROPS = {
  ...pickProps(COMMON_PROPS, [
    'disabled',
    'readonly',
    'requiredMarkPosition',
    'labelWidth',
    'clientType',
    'border',
    'round'
  ]),
  /**
   * 表单模型
   */
  models: {
    type: Array as PropType<FormModels>,
    required: true,
    default: () => []
  },

  /**
   * 表单数据
   */
  data: {
    type: Object as PropType<Record<string, any>>,
    default: undefined
  },

  /**
   * 显示属性联动
   */
  viewLinkage: {
    type: Array as PropType<ViewLinkageType>,
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
   * 内容对齐方式
   */
  contentAlign: {
    type: String as PropType<CellProps['contentAlign']>,
    default: 'left'
  }
}
