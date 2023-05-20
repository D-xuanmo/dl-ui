import { ICascaderOption, CascaderValue, COMMON_PROPS, IData } from '@xuanmo/dl-common'
import { ExtractPropTypes, PropType } from 'vue'

export type CascaderProps = ExtractPropTypes<typeof CASCADER_PROPS>

export const CASCADER_PROPS = {
  ...COMMON_PROPS,

  modelValue: {
    type: Array as PropType<CascaderValue>,
    default: []
  },

  placeholder: {
    type: String,
    default: '请选择'
  },

  /**
   * 级联选项数据源
   */
  options: {
    type: Array as PropType<ICascaderOption[]>,
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
  },

  /**
   * 是否开启懒加载
   */
  lazy: Boolean,

  /**
   * 数据懒加载，需要配合 lazy
   */
  lazyLoad: {
    type: Function as PropType<(option: ICascaderOption) => Promise<ICascaderOption[]>>,
    default: undefined
  }
}

export const CASCADER_TAB_PROPS = {
  /**
   * 选择的数据列表
   */
  data: {
    type: Array as PropType<IData[]>,
    required: true,
    default: () => []
  }
}
