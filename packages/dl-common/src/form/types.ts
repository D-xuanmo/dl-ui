import { ComponentNames } from '../index'
import { Component } from 'vue'

/**
 * 表单数据模型
 */
export type FormModels = Array<IFormModelItem | IRenderModel>

export interface IRenderModel<T = any> {
  // 唯一标识，前端独立使用可与 dataKey 相同，非字段类型没有 dataKey 属性
  id: string

  // 需要展示的标题
  label?: string

  // 组件
  component: Component | (ComponentNames | string)

  // 布局信息
  layout: T & {
    // 父级组件，默认为 root
    parent: string

    // 关联的子级
    children?: string[]
  }

  // 是否显示
  display?: boolean

  // 禁用
  disabled?: boolean

  // 只读
  readonly?: boolean
}

export interface IFormModelItem<TValue = unknown> extends IRenderModel {
  // 对应的数据键名
  dataKey: string

  // 当前字段数据
  value: TValue

  // 是否必填，会展示必填星号
  required?: boolean

  // 左侧标题宽度
  labelWidth?: string | number

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

export type OnFormChange = (value: Record<string, unknown>, model: IFormModelItem) => void
