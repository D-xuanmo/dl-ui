import { InjectionKey } from 'vue'
import { type CalendarStore, CalendarProps } from '../calendar'

type CalendarContext = {
  store: CalendarStore
  formatter: CalendarProps['formatter']
}

export const CALENDAR_CONTEXT_KEY = Symbol('calendar') as InjectionKey<CalendarContext>
