import { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { PlacementType } from '../common'
import { TRANSITION_DURATION } from '../constants/animation'

export type PopupProps = ExtractPropTypes<typeof POPUP_PROPS>

export const POPUP_PROPS = {
  visible: Boolean,
  title: String,
  placement: {
    type: String as PropType<PlacementType>,
    default: 'center'
  },
  zIndex: {
    type: Number,
    default: undefined
  },
  duration: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: TRANSITION_DURATION
  },
  round: Boolean,
  closeable: Boolean,
  closeIcon: {
    type: String,
    default: 'close'
  },
  teleport: {
    type: String as PropType<TeleportProps['to']>,
    default: 'body'
  },

  popupClass: String,
  popupStyle: {
    type: Object as PropType<CSSProperties>,
    default: {}
  },

  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: String,
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: {}
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
}
