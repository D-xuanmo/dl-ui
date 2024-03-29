import Overlay from './overlay.vue'
import { withInstall } from '../utils'

export const DOverlay = withInstall(Overlay)

export { type OverlayProps } from './props'

export default DOverlay

declare module 'vue' {
  export interface GlobalComponents {
    DOverlay: typeof Overlay
  }
}
