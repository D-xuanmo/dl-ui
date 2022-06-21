import { PropType } from 'vue'
import { DataType } from '../common'

export type ValueType = PropType<string[] | number[]>

/** 选择器每列数据类型 */
export type PickerColumnType = DataType & { children?: DataType[] }

/** 选择器数据类型 */
export type PickerColumnsType = PickerColumnType[] | PickerColumnType[][]

export const pickerProps = {
  visible: Boolean,
  value: {
    type: Array as ValueType,
    default: undefined
  },
  modelValue: {
    type: Array as ValueType,
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
