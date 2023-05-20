import { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, IData } from '@xuanmo/dl-common'
import { pickProps } from '@xuanmo/dl-common'

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

// 单个日期类型
export interface IDay extends IData<Date> {
  /**
   * 当前日期类型
   * selected：当前日期被选中
   * start：区间时，开始日期
   * middle：区间时，中间选择的日期
   * end：区间时，结束日期
   */
  type?: 'selected' | 'start' | 'middle' | 'end'

  // 日期唯一标识，格式为：yyyy/MM/dd
  id: string

  // 是否为当月日期
  isCurrentMonth: boolean

  // 是否为上月日期
  isPrevMonth: boolean

  // 是否为下月日期
  isNextMonth: boolean

  // 日期顶部文字
  topText?: string
  topTextStyle?: CSSProperties

  // 日期底部文字
  bottomText?: string
  bottomTextStyle?: CSSProperties
}

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
   * 可选最大日期，默认当前日期的后 10 年
   */
  maxDate: {
    type: Date,
    default: new Date(currentDate.getFullYear() + 10, 11, currentDate.getDate())
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
   * 月份选择格式化
   */
  monthFormatter: {
    type: String,
    default: 'yyyy/MM'
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

export const CALENDAR_HEADER_PROPS = {
  ...pickProps(CALENDAR_PROPS, ['minDate', 'maxDate', 'monthFormatter']),
  modelValue: {
    type: Date,
    default: undefined
  }
}

export const CALENDAR_DATE_PROPS = {
  ...pickProps(CALENDAR_PROPS, ['formatter']),
  date: {
    type: Object as PropType<IDay>,
    required: true
  }
}
