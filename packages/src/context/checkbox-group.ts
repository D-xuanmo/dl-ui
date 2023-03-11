import { ExtractPropTypes, InjectionKey, UnwrapRef, WritableComputedRef } from 'vue'
import { checkboxGroupProps } from '../checkbox-group/props'

type CheckboxGroupPropsType = ExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxGroupContextType = Omit<CheckboxGroupPropsType, 'modelValue' | 'disabled'> & {
  /**
   * 当前绑定的值
   */
  value: WritableComputedRef<(string | number)[]>

  disabled: WritableComputedRef<CheckboxGroupPropsType['disabled']>

  /**
   * 子级 change 事件
   * @param value
   */
  onChangeEvent: (value: UnwrapRef<CheckboxGroupContextType['value']>) => void
}

export const CHECKBOX_GROUP_KEY = Symbol(
  'DFormCheckboxGroup'
) as InjectionKey<CheckboxGroupContextType>
