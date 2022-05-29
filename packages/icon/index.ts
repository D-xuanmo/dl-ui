import _Icon from './icon.js'
import { withInstall } from '@/utils/with-install'

const Icon = withInstall(_Icon)

export default Icon

declare module 'vue' {
  export interface GlobalComponents {
    DIcon: typeof _Icon
  }
}
