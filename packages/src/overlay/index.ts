import _Overlay from './overlay.vue'
import { withInstall } from '../utils/with-install'

const Overlay = withInstall(_Overlay)

export default Overlay

declare module 'vue' {
  export interface GlobalComponents {
    DOverlay: typeof _Overlay
  }
}
