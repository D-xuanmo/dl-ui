import Calendar from './calendar.vue'
import { withInstall } from '../utils'

export const DCalendar = withInstall(Calendar)

export {
  type CalendarValue,
  type CalendarProps,
  type CalendarDayFormatter,
  type IDay,
  type CalendarType
} from './props'

export default DCalendar

declare module 'vue' {
  export interface GlobalComponents {
    DCalendar: typeof Calendar
  }
}
