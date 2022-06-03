import _Switch from './switch.vue'
import { withInstall } from '@/utils/with-install'

const Switch = withInstall(_Switch)

export default Switch

declare module 'vue' {
  export interface GlobalComponents {
    DSwitch: typeof _Switch
  }
}
