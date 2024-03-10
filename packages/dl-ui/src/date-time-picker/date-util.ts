import dateJS from '@xuanmo/datejs'
import { DateTimePickerType, DateTimePickerValue, DateTimePickerFormatter } from './props'
import { DateTimePickerOption } from './types'

class DateUtil {
  static formatType: Record<DateTimePickerType, string> = {
    'year-month': 'yyyy/MM',
    date: 'yyyy/MM/dd',
    datetime: 'yyyy/MM/dd HH:mm:ss',
    'date-hour': 'yyyy/MM/dd HH',
    'month-day': 'MM/dd',
    time: 'HH:mm'
  }

  date: Date = new Date()

  // 初始化传入的日期，不在改变
  freezeDate: Date = new Date()

  minDate: Date

  maxDate: Date

  dateType: DateTimePickerType

  formatter: DateTimePickerFormatter

  constructor(
    date: DateTimePickerValue,
    options: {
      dateType: DateUtil['dateType']
      formatter: DateUtil['formatter']
      minDate: Date
      maxDate: Date
    }
  ) {
    const { dateType, minDate, maxDate, formatter = (type, value) => value } = options
    this.dateType = dateType
    this.formatter = formatter
    this.minDate = minDate
    this.maxDate = maxDate
    this.update(date)
    this.freezeDate = this.date
  }

  get value() {
    return dateJS(this.date).format(DateUtil.formatType[this.dateType])
  }

  /**
   * 处理传入的 value 为 picker 需要的格式
   */
  get pickerValue() {
    const formatType: Record<DateTimePickerType, string> = {
      'year-month': 'yyyy,M',
      date: 'yyyy,M,d',
      datetime: 'yyyy,M,d,H,m,s',
      'date-hour': 'yyyy,M,d,H',
      'month-day': 'M,d',
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
    ] as DateTimePickerType[]
    // 转换月份，需要减一
    if (dateFormatTypes.includes(this.dateType)) {
      formatted.splice(this.dateType === 'month-day' ? 0 : 1, 1, `${+date.format('M') - 1}`)
    }
    return formatted
  }

  /**
   * 数组转换为日期
   * @param date
   */
  convertDate = (date: DateTimePickerValue | DateTimePickerValue[]): Date => {
    if (typeof date === 'number') {
      return new Date(date)
    }
    if (Array.isArray(date)) {
      /* eslint-disable indent */
      switch (this.dateType) {
        case 'date':
        case 'datetime':
        case 'date-hour':
        case 'year-month':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return new Date(...date)
        case 'month-day':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return new Date(...([this.freezeDate.getFullYear(), ...date] as any))
        case 'time':
          return new Date(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...([...dateJS(this.freezeDate).format('yyyy-M-d').split('-'), ...date] as any)
          )
      }
      /* eslint-enable indent */
    }

    /* eslint-disable indent */
    switch (this.dateType) {
      case 'date':
      case 'datetime':
      case 'date-hour':
        return new Date(date)
      case 'year-month':
        return new Date(`${date}/1`)
      case 'month-day':
        return new Date(`${this.freezeDate.getFullYear()}/${date}`)
      case 'time':
        return new Date(`${this.freezeDate.getFullYear()}/1/1 ${date}`)
    }
    /* eslint-enable indent */
  }

  /**
   * 更新时间
   * @param date
   */
  update = (date: DateTimePickerValue | DateTimePickerValue[]) => {
    this.date = this.convertDate(date)
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

  getYearColumn = (): DateTimePickerOption[] => {
    const currentYear = this.freezeDate.getFullYear()
    let start = 0
    let end = 0
    const startYears: DateTimePickerOption[] = []
    const endYears: DateTimePickerOption[] = []
    while (start < currentYear - this.minDate.getFullYear()) {
      start++
      const current = `${currentYear - start}`
      startYears.push({
        value: current,
        label: this.formatter('year', current),
        type: 'year'
      })
    }
    while (end < this.maxDate.getFullYear() - currentYear) {
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
    const column: DateTimePickerOption[] = []
    let i = this.date.getFullYear() !== this.freezeDate.getFullYear() ? 0 : this.minDate.getMonth()
    while (i <= this.maxDate.getMonth()) {
      column.push({
        value: `${i}`,
        label: this.formatter('month', `${i + 1}`.padStart(2, '0')),
        type: 'month'
      })
      i++
    }
    return column
  }

  getDayColumn = () => {
    const column: DateTimePickerOption[] = []
    const lastDay = dateJS(this.date).lastDay()
    const max = this.maxDate.getDate()
    const maxDay = max === 1 || max > lastDay ? lastDay : max
    let i = this.minDate.getDate()
    while (i <= maxDay) {
      column.push({
        value: `${i}`,
        label: this.formatter('day', `${i}`.padStart(2, '0')),
        type: 'day'
      })
      i++
    }
    return column
  }

  getHourColumn = () => {
    const column: DateTimePickerOption[] = []
    let i = 0
    while (i < 24) {
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
    const column: DateTimePickerOption[] = []
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
    const column: DateTimePickerOption[] = []
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
