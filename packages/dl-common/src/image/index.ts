import Image from './image.vue'
import { withInstall } from '../utils'

export const DImage = withInstall(Image)

export { type ImageProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DImage: typeof Image
  }
}
