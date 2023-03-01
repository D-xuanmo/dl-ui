import DatePicker from './date-picker.vue'
import { withInstall } from '../utils/with-install'

export const DDatePicker = withInstall(DatePicker)

export { type DateTimePickerColumnType } from './types'
export { type FormatterType } from './props'

export default DDatePicker

declare module 'vue' {
  export interface GlobalComponents {
    DDatePicker: typeof DatePicker
  }
}
