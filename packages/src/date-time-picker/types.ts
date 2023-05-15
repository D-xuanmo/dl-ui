import { IData } from '../common'

export type DateTimePickerOption = IData & {
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
}
