import dateJS from '@xuanmo/datejs'
import { IDay } from './types'

export const generateDayId = (date: Date) => dateJS(date).format('yyyy/MM/dd')

export const generateDay = (date: Date, option?: Partial<IDay>): IDay => {
  return {
    id: generateDayId(date),
    value: date,
    label: `${date.getDate()}`,
    ...option
  }
}

/**
 * 计算上月与本月相交的天数
 * @param date
 */
export const calcIntersectDays = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const result: IDay[] = []
  // 上月的最后一天
  const lastDay = dateJS(new Date(year, month - 1)).lastDay()
  const lastWeek = new Date(year, month - 1, lastDay).getDay()
  // 上月最后一天为周六，不计算相交日期
  if (lastWeek === 6) return []
  let i = 0
  while (i <= lastWeek) {
    const date = new Date(year, month - 1, lastDay - i)
    result.unshift(
      generateDay(date, {
        isPlaceholder: true
      })
    )
    i++
  }
  return result
}

/**
 * 生成指定日期区间列表
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param cb
 */
export const generateDateRange = (startDate: Date, endDate: Date, cb?: (date: Date) => void) => {
  const dates = []

  // 获取两个日期的时间戳
  const start = startDate.getTime() - 24 * 60 * 60 * 1000
  const end = endDate.getTime() - 24 * 60 * 60 * 1000

  for (let i = start; i <= end; ) {
    i = i + 24 * 60 * 60 * 1000
    const date = new Date(i)
    dates.push(date)
    cb?.(date)
  }

  return dates
}
