import Image from './image.vue'
import { withInstall } from '../utils'

export const DImage = withInstall(Image)

export { type ImageProps } from './props'

export default DImage

declare module 'vue' {
  export interface GlobalComponents {
    DImage: typeof Image
  }
}
