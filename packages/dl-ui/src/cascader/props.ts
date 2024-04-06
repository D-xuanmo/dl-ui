import { ICascaderOption, CascaderValue, COMMON_PROPS, pickProps } from '@xuanmo/dl-common'
import { ExtractPropTypes, PropType } from 'vue'
import { CascaderStore } from './store'

export type CascaderProps = ExtractPropTypes<typeof CASCADER_PROPS>

export const CASCADER_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly', 'keys']),

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
  title: {
    type: String,
    default: ''
  },

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
   * 搜索提示语
   */
  searchPlaceholder: {
    type: String,
    default: '输入关键词查询'
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

export const CASCADER_BODY_PROPS = {
  ...pickProps(CASCADER_PROPS, ['lazy', 'lazyLoad']),

  store: {
    type: Object as PropType<CascaderStore>,
    required: true,
    default: () => ({})
  }
}

export const CASCADER_SEARCH_PROPS = {
  ...pickProps(CASCADER_PROPS, ['searchPlaceholder']),
  store: {
    type: Object as PropType<CascaderStore>,
    required: true,
    default: () => ({})
  }
}

export const CASCADER_SEARCH_PANEL_PROPS = {
  store: {
    type: Object as PropType<CascaderStore>,
    required: true,
    default: () => ({})
  }
}

export const CASCADER_OPTION_ITEM_PROPS = {
  store: {
    type: Object as PropType<CascaderStore>,
    required: true,
    default: () => ({})
  },

  // 是否未选中状态
  active: {
    type: Boolean,
    default: false
  },

  option: {
    type: Object as PropType<ICascaderOption>,
    default: () => ({})
  }
}
