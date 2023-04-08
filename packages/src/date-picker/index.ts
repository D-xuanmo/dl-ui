import DatePicker from './date-picker.vue'
import { withInstall } from '../utils'

export const DDatePicker = withInstall(DatePicker)

export { type DateTimePickerColumnType } from './types'
export { type FormatterType, type DatePickerProps } from './props'

export default DDatePicker

declare module 'vue' {
  export interface GlobalComponents {
    DDatePicker: typeof DatePicker
  }
}
