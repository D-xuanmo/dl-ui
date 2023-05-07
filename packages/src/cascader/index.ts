import Cascader from './cascader.vue'
import { withInstall } from '../utils'

export const DCascader = withInstall(Cascader)

export { type CascaderProps } from './props'

export default DCascader

declare module 'vue' {
  export interface GlobalComponents {
    DCascader: typeof Cascader
  }
}
