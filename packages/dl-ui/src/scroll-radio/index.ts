import ScrollRadio from './scroll-radio.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DScrollRadio = withInstall(ScrollRadio)

export default DScrollRadio

export * from './types'

declare module 'vue' {
  export interface GlobalComponents {
    DScrollRadio: typeof ScrollRadio
  }
}
