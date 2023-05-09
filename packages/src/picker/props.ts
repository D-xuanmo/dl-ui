import { ExtractPropTypes, PropType } from 'vue'
import { CascadeOption, COMMON_PROPS, DataType } from '../common'

export type PickerValue = string[] | number[] | DataType[]

/** 选择器每列数据类型 */
export type PickerOption = DataType | CascadeOption

/** 选择器数据类型 */
export type PickerOptions = PickerOption[] | PickerOption[][]

export type PickerProps = ExtractPropTypes<typeof PICKER_PROPS>

export const PICKER_PROPS = {
  ...COMMON_PROPS,
  value: {
    type: Array as PropType<PickerValue>,
    default: undefined
  },
  modelValue: {
    type: Array as PropType<PickerValue>,
    default: undefined
  },

  placeholder: String,

  /**
   * 显示隐藏
   */
  visible: Boolean,

  /**
   * 是否受控
   */
  controlled: {
    type: Boolean,
    default: false
  },

  /**
   * 选择器列
   */
  options: {
    type: Array as PropType<PickerOptions>,
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
   * 选项单个高度
   */
  optionHeight: {
    type: Number,
    default: 42
  }
}
