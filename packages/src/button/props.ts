import { PropType } from 'vue'
import { SizeEnum, ThemeEnum } from '../common'

export const buttonProps = {
  theme: {
    type: String as PropType<ThemeEnum>,
    default: 'default'
  },
  size: {
    type: String as PropType<SizeEnum>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: undefined
  },
  block: Boolean,
  fill: {
    type: String as PropType<'solid' | 'outline' | 'none'>,
    default: 'solid'
  },
  shape: {
    type: String as PropType<'default' | 'rounded' | 'rectangular'>,
    default: 'default'
  },
  loading: Boolean
}
