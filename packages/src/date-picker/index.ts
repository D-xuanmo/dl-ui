import _DatePicker from './date-picker.vue'
import { withInstall } from '../utils/with-install'

const DatePicker = withInstall(_DatePicker)

export { type DateTimePickerColumnType } from './types'
export { type FormatterType } from './props'

export default DatePicker

declare module 'vue' {
  export interface GlobalComponents {
    DDatePicker: typeof _DatePicker
  }
}
