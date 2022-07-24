import { PropType } from 'vue'
import { DataType } from '../common'

export type PickerValueType = string[] | number[] | DataType[]

/** 级联选择数据类型 */
export type CascadeDataType = DataType & { children?: DataType[] }

/** 选择器每列数据类型 */
export type PickerColumnType = DataType | CascadeDataType

/** 选择器数据类型 */
export type PickerColumnsType = PickerColumnType[] | PickerColumnType[][]

export const pickerProps = {
  visible: Boolean,
  value: {
    type: Array as PropType<PickerValueType>,
    default: undefined
  },
  modelValue: {
    type: Array as PropType<PickerValueType>,
    default: undefined
  },
  columns: {
    type: Array as PropType<PickerColumnsType>,
    default: () => []
  },
  title: String,
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  optionHeight: {
    type: Number,
    default: 42
  }
}
