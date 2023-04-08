import Rate from './rate.vue'
import { withInstall } from '../utils'

export const DRate = withInstall(Rate)

export { type RateProps } from './props'

export default DRate

declare module 'vue' {
  export interface GlobalComponents {
    DRate: typeof Rate
  }
}
