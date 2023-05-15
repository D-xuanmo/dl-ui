import DateTimePicker from './date-time-picker.vue'
import { withInstall } from '../utils'

export const DDateTimePicker = withInstall(DateTimePicker)

export { type DateTimePickerOption } from './types'
export {
  type DateTimePickerFormatter,
  type DateTimePickerProps,
  type DateTimePickerType
} from './props'

export default DDateTimePicker

declare module 'vue' {
  export interface GlobalComponents {
    DDateTimePicker: typeof DateTimePicker
  }
}
