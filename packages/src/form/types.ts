import { ComponentNames } from '../index'
import { Component } from 'vue'

/**
 * 表单数据模型
 */
export type FormModel = Array<IFormModelItem>

/**
 * 表单单个分组信息
 */
export type FormGroupItem = {
  id: string
  title: string
  hide?: boolean
}

/**
 * 表单分组信息
 */
export type FormGroups = Array<FormGroupItem>

export interface IFormModelItem<TValue = unknown, TProps = Record<string, any>> {
  // 对应的数据键名
  name: string
  label: string
  value: TValue

  // 组件
  component: ComponentNames | string | Component

  // 是否必填，会展示必填星号
  required?: boolean

  // 左侧标题宽度
  labelWidth?: string | number

  // 校验规则
  rules?: string

  // 错误信息，用于覆盖校验失败的提示，不建议使用
  errorMessage?: string

  // 是否隐藏当前字段，默认不隐藏
  hide?: boolean

  // 对应的分组
  groupId?: string

  //描述字段
  desc?: string

  // 组件的其他参数
  otherProps?: TProps
}

export type OnFormChange = (value: Record<string, unknown>, model: IFormModelItem) => void
