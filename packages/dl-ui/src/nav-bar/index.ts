import NavBar from './nav-bar.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DNavBar = withInstall(NavBar)

export { type NavBarProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DNavBar: typeof NavBar
  }
}
