import { PropType } from 'vue'

export const radioProps = {
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
