import { PropType } from 'vue/dist/vue'
import { SizeType } from '@xuanmo/dl-common'
import { ExtractPropTypes } from 'vue'

export type IconProps = Partial<ExtractPropTypes<typeof ICON_PROPS>>

export const ICON_PROPS = {
  color: {
    type: String,
    default: 'inherit'
  },
  size: {
    type: String as PropType<SizeType | string>,
    default: 'medium'
  },
  class: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function as PropType<(event: any) => void>
  }
}
