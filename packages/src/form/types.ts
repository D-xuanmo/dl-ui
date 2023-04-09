import { ComponentNames } from '../index'

/**
 * 表单数据模型
 */
export type FormModel = Array<IFormModelItem>

export interface IFormModelItem<TValue = unknown, TProps = Record<string, any>> {
  // 对应的数据键名
  name: string
  label: string
  value: TValue
  componentName: ComponentNames
  required?: boolean
  labelWidth?: string | number
  rules?: string
  errorMessage?: string
  otherProps?: TProps
}
