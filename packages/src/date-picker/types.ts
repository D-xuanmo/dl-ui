import { DataType } from '../common'

export type DateTimePickerColumnType = DataType & { type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' }
