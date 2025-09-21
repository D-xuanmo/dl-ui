import dateJS from '@xuanmo/datejs'
import { DateTimePickerType, DateTimePickerValue, DateTimePickerFormatter } from './props'
import { DateTimePickerOption } from './types'

class DateUtil {
  static formatType: Record<DateTimePickerType, string> = {
    'year-month': 'yyyy/MM',
    year: 'yyyy',
    date: 'yyyy/MM/dd',
    datetime: 'yyyy/MM/dd HH:mm:ss',
    'date-hour': 'yyyy/MM/dd HH',
    'date-hour-minute': 'yyyy/MM/dd HH:mm',
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
    const { dateType, minDate, maxDate, formatter = (_, value) => value } = options
    this.dateType = dateType
    this.formatter = formatter
    this.minDate = this.convertMinDate(minDate)
    this.maxDate = this.convertMaxDate(maxDate)
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
      year: 'yyyy',
      date: 'yyyy,M,d',
      datetime: 'yyyy,M,d,H,m,s',
      'date-hour': 'yyyy,M,d,H',
      'date-hour-minute': 'yyyy,M,d,H,m',
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
      'month-day',
      'year',
      'date-hour-minute'
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
        case 'date-hour-minute':
        case 'year-month':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return new Date(...date)
        case 'date-hour':
          return new Date(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...([...dateJS(this.freezeDate).format('yyyy-M-d').split('-'), ...date] as any)
          )
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
        case 'year':
          return new Date(`${date}/1/1`)
      }
      /* eslint-enable indent */
    }

    /* eslint-disable indent */
    switch (this.dateType) {
      case 'date':
      case 'datetime':
      case 'date-hour-minute':
        return new Date(date)
      case 'year-month':
        return new Date(`${date}/1`)
      case 'month-day':
        return new Date(`${this.freezeDate.getFullYear()}/${date}`)
      case 'time':
        return new Date(`${this.freezeDate.getFullYear()}/1/1 ${date}`)
      case 'year':
        return new Date(`${date}/1/1`)
      case 'date-hour':
        return new Date(`${date}:00`)
    }
    /* eslint-enable indent */
  }

  /**
   * 更新时间
   * @param date
   */
  update = (date: DateTimePickerValue | DateTimePickerValue[]) => {
    this.date = this.convertDate(date)
    this.minDate = this.convertMinDate()
    this.maxDate = this.convertMaxDate()
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
      case 'date-hour-minute':
        return [
          this.getYearColumn(),
          this.getMonthColumn(),
          this.getDayColumn(),
          this.getHourColumn(),
          this.getMinute()
        ]
      case 'time':
        return [this.getHourColumn(), this.getMinute()]
      case 'year':
        return [this.getYearColumn()]
    }
    /* eslint-enable indent */
  }

  /**
   * 计算最小日期
   * @param minDate
   */
  convertMinDate(minDate: Date = this.minDate) {
    // 如果当前 value 小于最小日期，默认推后一年
    if (minDate.getTime() > this.date.getTime()) {
      return new Date(this.date.getFullYear(), 0, 1)
    }
    return minDate
  }

  /**
   * 计算最大日期
   * @param maxDate
   */
  convertMaxDate(maxDate: Date = this.maxDate) {
    // 如果当前 value 小于最小日期，默认推后一年
    if (this.date.getTime() > maxDate.getTime()) {
      return new Date(this.date.getFullYear(), 11, 31)
    }
    return maxDate
  }

  private getYearColumn = (): DateTimePickerOption[] => {
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

  private getMonthColumn = () => {
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

  private getDayColumn = () => {
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

  private getHourColumn = () => {
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

  private getMinute = () => {
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

  private getSecond = () => {
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
