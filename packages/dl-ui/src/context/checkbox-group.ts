import { InjectionKey, UnwrapRef, WritableComputedRef } from 'vue'
import { CheckboxGroupProps } from '../checkbox-group'

export type CheckboxGroupContextType = Omit<
  CheckboxGroupProps,
  'modelValue' | 'disabled' | 'readonly'
> & {
  /**
   * 当前绑定的值
   */
  value: WritableComputedRef<(string | number)[]>

  disabled: WritableComputedRef<CheckboxGroupProps['disabled']>

  readonly: WritableComputedRef<CheckboxGroupProps['readonly']>

  /**
   * 子级 change 事件
   * @param value
   */
  onChangeEvent: (value: UnwrapRef<CheckboxGroupContextType['value']>) => void
}

export const CHECKBOX_GROUP_CONTEXT_KEY = Symbol(
  'DLuiCheckboxGroup'
) as InjectionKey<CheckboxGroupContextType>
