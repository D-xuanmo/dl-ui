import { PropType } from 'vue'
import { DirectionType } from '../common'

export const radioGroupProps = {
  modelValue: {
    type: [String, Number],
    required: true
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  disabled: Boolean
}
