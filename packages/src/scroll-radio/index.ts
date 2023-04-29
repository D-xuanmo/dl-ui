import ScrollRadio from './scroll-radio.vue'
import { withInstall } from '../utils'

export const DScrollRadio = withInstall(ScrollRadio)

export default DScrollRadio

declare module 'vue' {
  export interface GlobalComponents {
    DScrollRadio: typeof ScrollRadio
  }
}
