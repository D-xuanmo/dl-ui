import { PropType } from 'vue/dist/vue'
import { ExtractPropTypes } from 'vue'

/** 所有大小类型定义 */
type SizeEnum = 'small' | 'medium' | 'large'

export type IconProps = Partial<ExtractPropTypes<typeof ICON_PROPS>>

export const ICON_PROPS = {
  color: {
    type: String,
    default: 'inherit'
  },
  size: {
    type: String as PropType<SizeEnum | string>,
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
