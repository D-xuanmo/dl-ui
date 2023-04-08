import dateJS from '@xuanmo/datejs'
import { DatePickerType, FormatterType } from './props'
import { DateTimePickerColumnType } from './types'

class DateUtil {
  date: Date = new Date()

  freezeDate: Date = new Date()

  dateType: DatePickerType = 'date'

  formatter: FormatterType

  constructor(
    date: string | Date,
    options: {
      dateType: DateUtil['dateType']
      formatter: DateUtil['formatter']
    }
  ) {
    this.date = typeof date === 'string' ? new Date(date) : date
    this.freezeDate = this.date
    this.dateType = options.dateType
    this.formatter =
      options.formatter ||
      function (type, value) {
        return value
      }
  }

  formatType: Record<DatePickerType, string> = {
    'year-month': 'yyyy/MM',
    date: 'yyyy/MM/dd',
    datetime: 'yyyy/MM/dd HH:mm:ss',
    'date-hour': 'yyyy/MM/dd HH',
    'month-day': 'MM/dd',
    time: 'HH:mm'
  }

  /**
   * 处理传入的 value 为 picker 需要的格式
   */
  formattedValue = () => {
    const formatType: Record<DatePickerType, string> = {
      'year-month': 'yyyy,M',
      date: 'yyyy,M,d',
      datetime: 'yyyy,M,d,H,m,s',
      'date-hour': 'yyyy,M,d,H',
      'month-day': 'm,d',
      time: 'H,m'
    }
    const date = dateJS(this.date)
    const formatted = date.format(formatType[this.dateType]).split(',')
    const dateFormatTypes = [
      'year-month',
      'date',
      'datetime',
      'date-hour',
      'month-day'
    ] as DatePickerType[]
    if (dateFormatTypes.includes(this.dateType)) {
      formatted.splice(1, 1, `${+date.format('M') - 1}`)
    }
    return formatted
  }

  /**
   * 格式化
   * @param date
   */
  formatValue = (date = this.date) => {
    return dateJS(date).format(this.formatType[this.dateType])
  }

  updateDate = (date: Date | string[]) => {
    this.date = Array.isArray(date) ? new Date(...(date as [])) : date
  }

  getColumns = () => {
    /* eslint-disable indent */
    switch (this.dateType) {
      case 'date':
        return [this.getYearColumn(), this.getMonthColumn(), this.getDayColumn()]
      case 'year-month':
        return [this.getYearColumn(), this.getMonthColumn()]
      case 'month-day':
        return [this.getMonthColumn(), this.getDayColumn()]
      case 'datetime':
        return [
          this.getYearColumn(),
          this.getMonthColumn(),
          this.getDayColumn(),
          this.getHourColumn(),
          this.getMinute(),
          this.getSecond()
        ]
      case 'date-hour':
        return [
          this.getYearColumn(),
          this.getMonthColumn(),
          this.getDayColumn(),
          this.getHourColumn()
        ]
      case 'time':
        return [this.getHourColumn(), this.getMinute()]
    }
    /* eslint-enable indent */
  }

  getYearColumn = (): DateTimePickerColumnType[] => {
    const currentYear = this.freezeDate.getFullYear()
    let start = 0
    let end = 0
    const startYears: DateTimePickerColumnType[] = []
    const endYears: DateTimePickerColumnType[] = []
    while (start < 10) {
      start++
      const current = `${currentYear - start}`
      startYears.push({
        value: current,
        label: this.formatter('year', current),
        type: 'year'
      })
    }
    while (end < 10) {
      end++
      const current = `${currentYear + end}`
      endYears.push({
        value: current,
        label: this.formatter('year', current),
        type: 'year'
      })
    }
    return [
      ...startYears.reverse(),
      {
        value: `${currentYear}`,
        label: this.formatter('year', `${currentYear}`),
        type: 'year'
      },
      ...endYears
    ]
  }

  getMonthColumn = () => {
    const column: DateTimePickerColumnType[] = []
    let i = 1
    while (i <= 12) {
      column.push({
        value: `${i - 1}`,
        label: this.formatter('month', `${i}`.padStart(2, '0')),
        type: 'month'
      })
      i++
    }
    return column
  }

  getDayColumn = () => {
    const column: DateTimePickerColumnType[] = []
    const lastDay = dateJS(this.date).lastDay()
    let i = 1
    while (i <= lastDay) {
      column.push({
        value: `${i}`,
        label: this.formatter('day', `${i}`.padStart(2, '0')),
        type: 'day'
      })
      i++
    }
    return column
  }

  getHourColumn = ({ min = 0, max = 24 }: { min?: number; max?: number } = {}) => {
    const column: DateTimePickerColumnType[] = []
    let i = min
    while (i < max) {
      column.push({
        value: `${i}`,
        label: this.formatter('hour', `${i}`.padStart(2, '0')),
        type: 'hour'
      })
      i++
    }
    return column
  }

  getMinute = () => {
    const column: DateTimePickerColumnType[] = []
    let i = 1
    while (i < 60) {
      column.push({
        value: `${i}`,
        label: this.formatter('minute', `${i}`.padStart(2, '0')),
        type: 'minute'
      })
      i++
    }
    return column
  }

  getSecond = () => {
    const column: DateTimePickerColumnType[] = []
    let i = 1
    while (i < 60) {
      column.push({
        value: `${i}`,
        label: this.formatter('second', `${i}`.padStart(2, '0')),
        type: 'second'
      })
      i++
    }
    return column
  }
}

export default DateUtil
