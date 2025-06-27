import { ComponentNames, ViewLinkageEventsType } from '../index'
import { Component } from 'vue'
import { EventPrefixEnum } from './constants'

/**
 * 表单数据模型
 */
export type FormModels = Array<IFormModelItem | IRenderModel>

export interface IRenderModel<T = any> {
  // 唯一标识，前端独立使用可与 dataKey 相同，非字段类型没有 dataKey 属性
  id: string

  // 需要展示的标题
  label?: string

  // 左侧标题宽度
  labelWidth?: string | number

  // 组件
  component: Component | (ComponentNames | string)

  // 组件类型
  componentType?: string

  // 布局信息
  layout: T & {
    // 父级组件，默认为 root
    parent: string

    // 是否需要组件容器
    container?: boolean

    // 后缀
    suffix?: string
  }

  // 是否显示
  display?: boolean

  // 禁用
  disabled?: boolean

  // 只读
  readonly?: boolean

  // 是否必填，会展示必填星号
  required?: boolean
}

export interface IFormModelItem<TValue = unknown> extends IRenderModel {
  // 对应的数据键名
  dataKey: string

  /**
   * 当前字段数据，
   * @example 非虚拟 key 时，dataKey 对应的数据：
   * {
   *   dataKey: 'value'
   * }
   * @example 虚拟 key 时，value 将会以对象返回，数据格式如下：
   * {
   *   key1: 'value1',
   *   key2: 'value2'
   * }
   */
  value: TValue

  /**
   * 是否为虚拟 key，默认为 false
   * @example true 时，数据以多个属性存在，格式如下：
   * {
   *   key1: 'value1',
   *   key2: 'value2'
   * }
   * @example false 时，数据以单个属性存在，格式如下：
   * {
   *   dataKey: {
   *     key1: 'value1',
   *     key2: 'value2'
   *   }
   * }
   */
  isVirtualKey?: boolean

  /**
   * 当 isVirtualKey 为 true 时，需要指定虚拟 key 的值，否则 value 将获取不到数据
   * @example ['key1', 'key2']
   */
  valueItems?: string[]

  // 明细表 id
  detailTableId?: string

  // 隐藏 label，默认：false
  hideLabel?: boolean

  // 校验规则
  rules?: string

  // 错误信息，用于覆盖校验失败的提示，不建议使用
  errorMessage?: string

  // 描述字段
  description?: string

  // 外部更多属性
  [key: string]: any
}

export interface IDetailTableItem extends IRenderModel {
  // 明细表 id
  detailTableId: string

  // 组件类型
  componentType: 'DetailTable'
}

export type OnFormChange = (
  value: Record<string, unknown>,
  model: IFormModelItem,
  rowId?: string
) => void

type EventType = 'change' | 'blur' | 'focus'

type FormEventType = `${EventPrefixEnum.FORM}.ready`

type FieldEventType =
  | `${EventPrefixEnum.FIELD}.change`
  | `${EventPrefixEnum.FIELD}.${string}.${EventType}`

export type EventsType = FormEventType | FieldEventType | ViewLinkageEventsType | string
