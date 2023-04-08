import { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { TRANSITION_DURATION } from '../constants/animation'

export type OverlayProps = ExtractPropTypes<typeof OVERLAY_PROPS>

export const OVERLAY_PROPS = {
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
  }
}
