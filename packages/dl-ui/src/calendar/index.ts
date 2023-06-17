import Calendar from './calendar.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DCalendar = withInstall(Calendar)

export {
  type CalendarValue,
  type CalendarProps,
  type CalendarDayFormatter,
  type CalendarType
} from './props'

export { type CalendarStore } from './store'

export { type IDay } from './types'

export default DCalendar

declare module 'vue' {
  export interface GlobalComponents {
    DCalendar: typeof Calendar
  }
}
