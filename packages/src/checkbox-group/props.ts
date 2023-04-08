import { ExtractPropTypes, PropType } from 'vue'
import { DataType, DirectionType } from '../common'

export type CheckboxGroupProps = ExtractPropTypes<typeof CHECKBOX_GROUP_PROPS>

export const CHECKBOX_GROUP_PROPS = {
  modelValue: {
    type: [Array] as PropType<(string | number)[]>,
    required: true
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  disabled: Boolean,
  options: {
    type: Array as PropType<Array<DataType> | undefined>,
    default: undefined
  },

  /**
   * 最大选择个数
   */
  max: Number
}
