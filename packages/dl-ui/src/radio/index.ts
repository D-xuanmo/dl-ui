import Radio from './radio.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DRadio = withInstall(Radio)

export { type RadioProps } from './props'

export default DRadio

declare module 'vue' {
  export interface GlobalComponents {
    DRadio: typeof Radio
  }
}
