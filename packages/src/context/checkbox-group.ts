import { InjectionKey, UnwrapRef, WritableComputedRef } from 'vue'
import { CheckboxGroupProps } from '../checkbox-group'

export type CheckboxGroupContextType = Omit<CheckboxGroupProps, 'modelValue' | 'disabled'> & {
  /**
   * 当前绑定的值
   */
  value: WritableComputedRef<(string | number)[]>

  disabled: WritableComputedRef<CheckboxGroupProps['disabled']>

  /**
   * 子级 change 事件
   * @param value
   */
  onChangeEvent: (value: UnwrapRef<CheckboxGroupContextType['value']>) => void
}

export const CHECKBOX_GROUP_CONTEXT_KEY = Symbol(
  'DFormCheckboxGroup'
) as InjectionKey<CheckboxGroupContextType>
