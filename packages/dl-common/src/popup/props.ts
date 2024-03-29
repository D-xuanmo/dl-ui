import { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, PlacementEnum } from '../common'
import { TRANSITION_DURATION } from '../constants'
import { pickProps } from '../utils'

export type PopupProps = ExtractPropTypes<typeof POPUP_PROPS>

export const POPUP_PROPS = {
  ...pickProps(COMMON_PROPS, ['lockScroll', 'teleport', 'lazyRender']),
  visible: Boolean,
  title: String,
  placement: {
    type: String as PropType<PlacementEnum>,
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
  closable: Boolean,

  /**
   * 动画前缀
   */
  transitionPrefix: {
    type: String,
    default: undefined
  },
  transitionAppear: {
    type: Boolean,
    default: false
  },

  popupContainerClass: String,
  popupClass: String,
  popupHeaderClass: String,
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
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  }
}
