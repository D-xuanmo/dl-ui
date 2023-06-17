import { IData } from '@xuanmo/dl-common'
import { CSSProperties } from 'vue'

// 单个日期类型
export interface IDay extends IData<Date> {
  /**
   * 当前日期类型
   * selected：当前日期被选中
   * start：区间时，开始日期
   * middle：区间时，中间选择的日期
   * end：区间时，结束日期
   */
  type?: 'selected' | 'start' | 'middle' | 'end' | null

  // 日期唯一标识，格式为：yyyy/MM 或者 yyyy/MM/dd
  id: string

  // 是否为月份
  isMonth?: boolean

  // 当月所有日期列表，只在 isMonth 为 true 时有此字段
  days?: string[]

  // 上月与本月相交天数，只在 isMonth 为 true 时有此字段
  intersectDayCount?: number

  // 日期顶部文字
  topText?: string
  topTextStyle?: CSSProperties

  // 日期底部文字
  bottomText?: string
  bottomTextStyle?: CSSProperties
}
