import { computed, Ref } from 'vue'
import dateJS from '@xuanmo/datejs'
import { IDay } from './props'

export const generateDayId = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
}

export const generateDay = (date: Date, option?: Partial<IDay>): IDay => {
  return {
    id: generateDayId(date),
    value: date,
    label: `${date.getDate()}`,
    isCurrentMonth: true,
    isPrevMonth: false,
    isNextMonth: false,
    ...option
  }
}

/**
 * 获取日期列表
 * @param currentDay 当天日期
 * @param selected 所有选择的日期 map
 * @param options
 */
export const useCurrentDays = (
  currentDay: Ref<Date>,
  selected: Ref<Map<string, IDay | null>>,
  options: {
    startDay: Ref<IDay | null>
    endDay: Ref<IDay | null>
    disabledMinDay: Date
    disabledMaxDay: Date
  }
) => {
  return computed<IDay[]>(() => {
    const days: IDay[] = []

    // 本月最后一天
    const lastDay = dateJS(currentDay.value).lastDay()

    // 本年
    const year = currentDay.value.getFullYear()

    // 本月
    const month = currentDay.value.getMonth()

    // 计算上月到本月的第一周相交的日期列表
    {
      // 本月的第一天
      const maxDay = new Date(year, month, 1)

      // 上月的最后一天
      const lastDay = dateJS(new Date(year, month - 1)).lastDay()
      let i = 0
      while (i < maxDay.getDay()) {
        const currentDay = lastDay - i
        const currentDate = new Date(year, month - 1, currentDay)
        days.unshift(
          generateDay(currentDate, {
            label: `${currentDay}`,
            isCurrentMonth: false,
            isPrevMonth: true
          })
        )
        i++
      }
    }

    // 计算本月的所有日期
    {
      let i = 1
      while (i <= lastDay) {
        const currentDate = new Date(year, month, i)
        const currentTimestamp = +currentDate
        const id = generateDayId(currentDate)
        const day = generateDay(currentDate, {
          label: `${i}`,
          id,
          type: selected.value.get(id)?.type,
          disabled:
            currentTimestamp < +options.disabledMinDay || currentTimestamp > +options.disabledMaxDay
        })
        if (options.startDay?.value && options.endDay?.value) {
          const start = +options.startDay?.value?.value
          const end = +options.endDay?.value?.value
          if (start === currentTimestamp) {
            Object.assign(day, {
              type: 'start',
              bottomText: '开始'
            })
          } else if (end === currentTimestamp) {
            Object.assign(day, {
              type: 'end',
              bottomText: '结束'
            })
          } else {
            if (currentTimestamp > start && currentTimestamp < end) {
              Object.assign(day, {
                type: 'middle'
              })
            }
          }
        }
        days.push(day)
        i++
      }
    }

    // 计算本月最后一天与下月首周相交的日期列表
    {
      let i = new Date(year, month, lastDay).getDay()
      let j = 1
      let lastDate: Date | null = null
      while (i < 6) {
        const currentDate = new Date(year, month + 1, j)
        lastDate = currentDate
        days.push(
          generateDay(currentDate, {
            label: `${j}`,
            isCurrentMonth: false,
            isNextMonth: true
          })
        )
        i++
        j++
      }
      // 如果不足 42 个日期，补充一组日期
      if (days.length < 42) {
        const freezeDay = lastDate?.getDate() || 0
        let i = freezeDay + 1
        while (i <= freezeDay + 7) {
          const currentDate = new Date(year, month + 1, i)
          days.push(
            generateDay(currentDate, {
              label: `${i}`,
              isCurrentMonth: false,
              isNextMonth: true
            })
          )
          i++
        }
      }
    }
    return days
  })
}
