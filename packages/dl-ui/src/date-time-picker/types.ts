import { IData } from '@xuanmo/dl-common'

export type DateTimePickerOption = IData & {
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
}
