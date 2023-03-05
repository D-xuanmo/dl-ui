import { PropType } from 'vue'

export const checkboxProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  label: String,
  defaultChecked: Boolean,
  disabled: Boolean,
  icon: String,
  name: String
}
