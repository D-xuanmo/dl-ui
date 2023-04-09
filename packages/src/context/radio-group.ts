import { InjectionKey, WritableComputedRef } from 'vue'
import { RadioGroupProps } from '../radio-group'

type RadioGroupContextType = Omit<RadioGroupProps, 'modelValue' | 'disabled' | 'readonly'> & {
  /**
   * 当前绑定的值
   */
  value: WritableComputedRef<string | number>

  disabled: WritableComputedRef<RadioGroupProps['disabled']>

  readonly: WritableComputedRef<RadioGroupProps['readonly']>

  /**
   * 子级 change 事件
   * @param value
   */
  onChangeEvent: (value: string | number) => void
}

export const RADIO_GROUP_CONTEXT_KEY = Symbol(
  'DFormRadioGroup'
) as InjectionKey<RadioGroupContextType>
