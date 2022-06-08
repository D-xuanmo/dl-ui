import _Rate from './rate.vue'
import { withInstall } from '../utils/with-install'

const Rate = withInstall(_Rate)

export default Rate

declare module 'vue' {
  export interface GlobalComponents {
    DRate: typeof _Rate
  }
}
