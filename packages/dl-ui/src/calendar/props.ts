import { ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS } from '@xuanmo/dl-common'
import { IDay } from './types'

export type CalendarValue = string | Array<string>

/**
 * 日历选择类型
 * single：单选
 * multiple：多选
 * range：日期区间
 */
export type CalendarType = 'single' | 'multiple' | 'range'

/**
 * 单个日期格式化
 */
export type CalendarDayFormatter = (day: IDay) => IDay

export type CalendarProps = ExtractPropTypes<typeof CALENDAR_PROPS>

const currentDate = new Date()

export const CALENDAR_PROPS = {
  ...COMMON_PROPS,
  modelValue: {
    type: [String, Array] as PropType<CalendarValue>,
    default: undefined
  },

  type: {
    type: String as PropType<CalendarType>,
    default: <CalendarType>'single'
  },

  /**
   * 可选最小日期，默认当前日期
   */
  minDate: {
    type: Date,
    default: currentDate
  },

  /**
   * 可选最大日期，默认当前日期的后 1 年
   */
  maxDate: {
    type: Date,
    default: new Date(currentDate.getFullYear(), 11, currentDate.getDate())
  },

  placeholder: {
    type: String,
    default: ''
  },

  /**
   * 弹出框标题
   */
  title: {
    type: String,
    default: '日期选择'
  },

  /**
   * 显示日期格式化
   */
  displayFormatter: {
    type: String,
    default: 'yyyy/MM/dd'
  },

  /**
   * 已选数据格式化
   */
  valueFormatter: {
    type: String,
    default: 'yyyy/MM/dd'
  },

  /**
   * 月份格式化
   */
  monthFormatter: {
    type: String,
    default: 'yyyy年M月'
  },

  /**
   * 单个日期格式化
   */
  formatter: {
    type: Function as PropType<CalendarDayFormatter>,
    default: undefined
  },

  /**
   * 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认'
  }
}
