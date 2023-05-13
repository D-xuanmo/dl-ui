import { COMMON_PROPS } from '../common'
import { ExtractPropTypes, PropType } from 'vue'
import { DateTimePickerOption } from './types'

export type DatePickerType = 'date' | 'year-month' | 'month-day' | 'time' | 'datetime' | 'date-hour'

export type DatePickerValue = string | Date

export type FormatterType<V extends string | number = string> = (
  type: DateTimePickerOption['type'],
  value: V
) => V

export type DatePickerProps = ExtractPropTypes<typeof DATE_PICKER_PROPS>

const currentDate = new Date()

export const DATE_PICKER_PROPS = {
  ...COMMON_PROPS,
  modelValue: {
    type: [String, Date] as PropType<DatePickerValue>,
    default: undefined
  },

  /**
   * 显示隐藏
   */
  visible: {
    type: Boolean,
    default: false
  },

  /**
   * 支持设置一个顶部标题
   */
  title: String,

  /**
   * 日期格式
   */
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },

  /**
   * 可选最小日期，默认当前日期的前 10 年
   */
  minDate: {
    type: Date,
    default: new Date(currentDate.getFullYear() - 10, 0, 1)
  },

  /**
   * 可选最大日期，默认当前日期的后 10 年
   */
  maxDate: {
    type: Date,
    default: new Date(currentDate.getFullYear() + 10, 11, 1)
  },

  /**
   * 每列格式化函数
   */
  formatter: {
    type: Function as PropType<FormatterType>,
    default: undefined
  }
}
