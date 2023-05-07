import { CascadeDataType, COMMON_PROPS, DataType } from '../common'
import { ExtractPropTypes, PropType } from 'vue'

export type CascaderValueType = string[] | number[] | DataType[]

export type CascaderProps = ExtractPropTypes<typeof CASCADER_PROPS>

export const CASCADER_PROPS = {
  ...COMMON_PROPS,

  value: {
    type: Array as PropType<CascaderValueType>,
    default: undefined
  },
  modelValue: {
    type: Array as PropType<CascaderValueType>,
    default: undefined
  },

  placeholder: {
    type: String,
    default: '请选择'
  },

  columns: {
    type: Array as PropType<CascadeDataType[]>,
    required: true,
    default: () => []
  },

  /**
   * 支持设置一个顶部标题
   */
  title: String,

  /**
   * 关闭按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消'
  },

  /**
   * 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认'
  }
}

export const CASCADER_TAB_PROPS = {
  /**
   * 选择的数据列表
   */
  data: {
    type: Array as PropType<DataType[]>,
    required: true,
    default: () => []
  }
}
