import Icon from './icon'
import { withInstall } from './with-install'

export { type IconProps } from './props'

export const DIcon = withInstall(Icon)

export default DIcon

declare module 'vue' {
  export interface GlobalComponents {
    DIcon: typeof Icon
  }
}
