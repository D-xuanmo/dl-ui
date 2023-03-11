import { PropType } from 'vue'
import { DateTimePickerColumnType } from './types'

export type DatePickerType = 'date' | 'year-month' | 'month-day' | 'time' | 'datetime' | 'date-hour'

export type DatePickerValueType = string | Date

export type FormatterType<V extends string | number = string> = (
  type: DateTimePickerColumnType['type'],
  value: V
) => V

export const datePickerProps = {
  visible: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Date] as PropType<DatePickerValueType>,
    default: undefined
  },
  modelValue: {
    type: [String, Date] as PropType<DatePickerValueType>,
    default: new Date()
  },
  title: String,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },
  formatter: {
    type: Function as PropType<FormatterType>,
    default: undefined
  }
}
