import _Popup from './popup.vue'
import { withInstall } from '../utils/with-install'

const Popup = withInstall(_Popup)

export default Popup

declare module 'vue' {
  export interface GlobalComponents {
    DPopup: typeof _Popup
  }
}
