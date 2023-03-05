import Popup from './popup.vue'
import { withInstall } from '../utils'

export const DPopup = withInstall(Popup)

export default DPopup

declare module 'vue' {
  export interface GlobalComponents {
    DPopup: typeof Popup
  }
}
