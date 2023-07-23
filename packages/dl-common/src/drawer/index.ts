import Drawer from './drawer'
import { withInstall } from '../utils'

export const DDrawer = withInstall(Drawer)

export { type DrawerProps } from './props'

export default DDrawer

declare module 'vue' {
  export interface GlobalComponents {
    DDrawer: typeof Drawer
  }
}
