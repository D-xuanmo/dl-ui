import Icon from './icon.js'
import { withInstall } from '@xuanmo/dl-common'

export const DIcon = withInstall(Icon)

export default DIcon

declare module 'vue' {
  export interface GlobalComponents {
    DIcon: typeof Icon
  }
}
