import { PropType } from 'vue'
import { PickerColumnType, pickerProps } from './props'
import { DataType } from '../common'

export const pickerItemProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  options: {
    type: Array as PropType<PickerColumnType[]>,
    default: () => []
  },
  optionHeight: pickerProps.optionHeight,
  onChange: {
    type: Function as PropType<(data: DataType) => void>,
    default: () => {}
  }
}
