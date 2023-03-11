import { PropType } from 'vue'
import { DirectionType } from '../common'

export const checkboxGroupProps = {
  modelValue: {
    type: [Array] as PropType<(string | number)[]>,
    required: true
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  disabled: Boolean,

  /**
   * 最大选择个数
   */
  max: Number
}
