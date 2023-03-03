import { ExtractPropTypes, InjectionKey, WritableComputedRef } from 'vue'
import { radioGroupProps } from '../radio-group/props'

type RadioGroupPropsType = ExtractPropTypes<typeof radioGroupProps>

type RadioGroupContextType = Omit<RadioGroupPropsType, 'modelValue' | 'disabled'> & {
  /**
   * 当前绑定的值
   */
  value: WritableComputedRef<string | number>

  disabled: WritableComputedRef<RadioGroupPropsType['disabled']>

  /**
   * 子级 change 事件
   * @param value
   */
  onChangeEvent: (value: string | number) => void
}

export const RADIO_GROUP_KEY = Symbol('DFormRadioGroup') as InjectionKey<RadioGroupContextType>
