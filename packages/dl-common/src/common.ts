import { PropType } from 'vue'

/** 水平对齐方式 */
export type HorizontalAlignType = 'left' | 'center' | 'right'

/** 所有大小类型定义 */
export type SizeEnum = 'small' | 'medium' | 'large'

/** 格式化触发时机 */
export type FieldFormatterTrigger = 'onChange' | 'onBlur'

/** 弹框位置类型 */
export type PlacementEnum = 'top' | 'right' | 'bottom' | 'left' | 'center' | 'custom'

/** 主题类型 */
export type ThemeEnum = 'primary' | 'success' | 'warning' | 'danger' | 'default'

/** 消息类型 */
export type MessageThemeEnum = 'info' | 'success' | 'warning' | 'error'

/** 数据基础类型，单选、多选、选择器等组件 */
export interface IData<T = string | number> {
  label: string
  value: T
  disabled?: boolean
}

/** 排除 props value / modelValue */
export type OmitValueProperties<T extends Record<string, unknown>> = Omit<T, 'value' | 'modelValue'>

export type DirectionType = 'horizontal' | 'vertical'

/** 级联选择数据为对象时的类型 */
export type CascaderObjectValue = IData[]

/** 级联数据类型 */
export type CascaderValue = string[] | number[] | CascaderObjectValue

/** 级联选择数据类型 */
export interface ICascaderOption extends IData {
  // 子级数据
  children?: IData[]

  // 当前数据所在级数
  level?: number
}

/**
 * 自定义数据相关属性
 */
export type CustomKeys = {
  label?: string
  value?: string
  children?: string
}

export const COMMON_PROPS = {
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  keys: {
    type: Object as PropType<CustomKeys>,
    default: undefined
  },

  /**
   * 锁定 body 滚动
   * @default true
   */
  lockScroll: {
    type: Boolean,
    default: true
  }
}
