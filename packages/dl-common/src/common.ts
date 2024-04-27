import { PropType } from 'vue'
import { TeleportProps } from 'vue/dist/vue'
import {
  SizeEnum,
  ThemeEnum,
  PlacementEnum,
  MessageThemeEnum,
  HorizontalAlignEnum
} from './constants'

/** 水平对齐方式 */
export type HorizontalAlignType = `${HorizontalAlignEnum}`

/** 所有大小类型定义 */
export type SizeType = `${SizeEnum}`

/** 格式化触发时机 */
export type FieldFormatterTrigger = 'onChange' | 'onBlur'

/** 弹框位置类型 */
export type PlacementType = `${PlacementEnum}`

/** 主题类型 */
export type ThemeType = `${ThemeEnum}`

/** 消息类型 */
export type MessageThemeType = `${MessageThemeEnum}`

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

  /**
   * 当前数据所在级数
   * 层级从 1 开始计数
   */
  __level?: number

  /**
   * 当前层级的父级
   * 一级选项的 parent 为 ROOT
   */
  __parent?: IData['value']
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

  /**
   * 自定义 key
   */
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
  },

  /**
   * 需要将元素插入到那个位置
   */
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },

  /**
   * 是否开启懒加载渲染，默认开启
   */
  lazyRender: {
    type: Boolean,
    default: true
  },

  /**
   * 必填标识位置
   */
  requiredMarkPosition: String as PropType<Exclude<HorizontalAlignType, 'center'>>,

  /**
   * 表单宽度
   */
  labelWidth: [Number, String] as PropType<number | string>,

  /**
   * 终端类型
   */
  clientType: String as PropType<'PC' | 'MOBILE'>,

  /**
   * 边框显示
   */
  border: {
    type: Boolean,
    default: undefined
  },

  /**
   * 显示圆角
   */
  round: {
    type: Boolean,
    default: undefined
  }
}
