import { PropType } from 'vue'
import { PickerColumnType, PICKER_PROPS } from './props'
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
  optionHeight: PICKER_PROPS.optionHeight,
  onChange: {
    type: Function as PropType<(data: DataType) => void>,
    default: () => {}
  }
}
