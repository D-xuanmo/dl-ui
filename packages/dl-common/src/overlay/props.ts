import { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { TRANSITION_DURATION } from '../constants'
import { pickProps } from '../utils'
import { COMMON_PROPS } from '../common'

export type OverlayProps = ExtractPropTypes<typeof OVERLAY_PROPS>

export const OVERLAY_PROPS = {
  ...pickProps(COMMON_PROPS, ['lockScroll']),
  visible: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: undefined
  },
  duration: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: TRANSITION_DURATION
  },
  overlayClass: {
    type: String,
    default: ''
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String as PropType<TeleportProps['to']>,
    default: 'body'
  },

  /**
   * 是否开启懒加载渲染，默认开启
   */
  lazyRender: {
    type: Boolean,
    default: true
  }
}
