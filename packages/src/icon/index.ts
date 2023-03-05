import Icon from './icon.js'
import { withInstall } from '../utils'

export const DIcon = withInstall(Icon)

export default DIcon

declare module 'vue' {
  export interface GlobalComponents {
    DIcon: typeof Icon
  }
}
