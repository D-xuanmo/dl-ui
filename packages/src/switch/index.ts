import Switch from './switch.vue'
import { withInstall } from '../utils/with-install'

export const DSwitch = withInstall(Switch)

export default DSwitch

declare module 'vue' {
  export interface GlobalComponents {
    DSwitch: typeof Switch
  }
}
