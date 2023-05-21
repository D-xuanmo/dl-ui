import { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { PlacementType } from '@xuanmo/dl-common'
import { TRANSITION_DURATION } from '@xuanmo/dl-common'

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
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },

  transitionAppear: {
    type: Boolean,
    default: false
  },

  popupContainerClass: String,
  popupClass: String,
  popupBodyClass: String,
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
