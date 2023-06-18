import { reactive } from 'vue'
import { IDay } from './types'
import dateJS from '@xuanmo/datejs'
import { calcIntersectDays, generateDateRange, generateDay } from './utils'
import { CalendarProps } from './props'
import { isEmpty } from '@xuanmo/javascript-utils'

interface State extends Pick<CalendarProps, 'minDate' | 'maxDate' | 'type' | 'monthFormatter'> {
  // 日期分组数据
  dateGroups: Map<string, IDay>

  // 开始日期
  startDay?: IDay

  // 结束日期
  endDay?: IDay

  // 选择结束
  selectedComplete: boolean
}

class CalendarStore {
  state: State

  // 已选数据集合
  selected: Set<string> = new Set()

  constructor(props: Pick<State, 'minDate' | 'maxDate' | 'type' | 'monthFormatter'>) {
    this.state = reactive<State>({
      dateGroups: new Map(),
      minDate: props.minDate,
      maxDate: props.maxDate,
      type: props.type,
      monthFormatter: props.monthFormatter,
      selectedComplete: props.type !== 'range'
    })
  }

  /**
   * 生成所有日期列表
   */
  generateDateGroups = () => {
    const groups: Map<string, IDay> = new Map()
    const start = new Date(`${dateJS(this.state.minDate).format('yyyy/MM')}/1`)
    const end = new Date(
      `${dateJS(this.state.maxDate).format('yyyy/MM')}/${dateJS(this.state.maxDate).lastDay()}`
    )
    const min = +dateJS(this.state.minDate).format('yyyyMMdd')
    generateDateRange(start, end, (current) => {
      const monthString = dateJS(current).format('yyyy/MM')
      const day = generateDay(current)
      if (+dateJS(current).format('yyyyMMdd') < min) {
        Object.assign<IDay, Partial<IDay>>(day, {
          disabled: true
        })
      }
      if (!groups.get(monthString)) {
        groups.set(monthString, {
          id: monthString,
          value: current,
          label: dateJS(current).format(this.state.monthFormatter),
          isMonth: true,
          days: [day.id],
          intersectDayCount: calcIntersectDays(current).length
        })
      } else {
        groups.get(monthString)?.days?.push(day.id)
      }
      groups.set(day.id, day)
    })
    this.state.dateGroups = groups
  }

  setState = (state: Partial<State>) => {
    Object.assign(this.state, state)
  }

  /**
   * 获取单个日期
   * @param id
   */
  getDay = (id: string) => this.state.dateGroups.get(id)!

  /**
   * 更新单个日期
   * @param day
   */
  updateDay = (day: IDay) => this.state.dateGroups.set(day.id, day)

  /**
   * 执行选择
   * @param day
   */
  handleSelect = (day: IDay) => {
    /* eslint-disable indent */
    switch (this.state.type) {
      case 'single':
        this.handleSingleSelect(day)
        break
      case 'multiple':
        this.handleMultiSelect(day)
        break
      case 'range':
        this.handleRangeSelect(day)
        break
    }
    /* eslint-enable indent */
  }

  /**
   * 单选
   * @param day
   */
  private handleSingleSelect = (day: IDay) => {
    const selected = Array.from(this.selected)
    if (selected[0]) {
      this.updateDay({
        ...this.getDay(selected[0]),
        type: null
      })
    }
    this.selected.clear()
    this.selected.add(day.id)
    if (day.type === 'selected') {
      this.updateDay({
        ...day,
        type: null
      })
    } else {
      this.updateDay({
        ...day,
        type: 'selected'
      })
    }
  }

  /**
   * 多选
   * @param day
   */
  private handleMultiSelect = (day: IDay) => {
    const selected = new Set<string>(this.selected)
    if (day.type === 'selected') {
      this.updateDay({
        ...day,
        type: null
      })
      selected.delete(day.id)
    } else {
      this.updateDay({
        ...day,
        type: 'selected'
      })
      selected.add(day.id)
    }
    this.selected = selected
  }

  /**
   * 区间选择
   * @param day
   */
  private handleRangeSelect = (day: IDay) => {
    if (this.selected.size === 2) this.clearSelected()
    if (isEmpty(this.selected)) {
      this.updateDay({
        ...day,
        type: 'start',
        bottomText: '开始'
      })
      this.selected.add(day.id)
    } else {
      const [start] = this.selected
      const startDay = this.getDay(start)
      if (+startDay.value < +day.value) {
        this.updateDay({
          ...day,
          type: 'end',
          bottomText: '结束'
        })
        generateDateRange(startDay.value, day.value, (date) => {
          const rangeDay = generateDay(date, {
            type: 'middle'
          })
          if (rangeDay.id === startDay.id || rangeDay.id === day.id) return
          this.updateDay(
            generateDay(date, {
              type: 'middle'
            })
          )
        })
        this.selected.add(day.id)
        this.setState({
          selectedComplete: true
        })
      } else {
        this.clearSelected()
        this.selected.add(day.id)
        this.updateDay({
          ...day,
          type: 'start',
          bottomText: '开始'
        })
      }
    }
  }

  clearSelected = () => {
    if (this.state.type === 'range' && this.selected.size === 2) {
      const [start, end] = this.selected
      generateDateRange(this.getDay(start).value, this.getDay(end).value, (date) => {
        this.updateDay(
          generateDay(date, {
            type: null
          })
        )
      })
    } else {
      this.selected.forEach((dayId) => {
        this.updateDay(
          generateDay(this.getDay(dayId).value, {
            type: null
          })
        )
      })
    }
    this.selected.clear()
  }
}

export { CalendarStore }
