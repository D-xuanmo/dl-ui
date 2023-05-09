import { DataType } from '../common'

export type DateTimePickerOption = DataType & {
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
}
