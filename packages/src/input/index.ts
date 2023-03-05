import Input from './input.vue'
import { withInstall } from '../utils'

export const DInput = withInstall(Input)

export default DInput

declare module 'vue' {
  export interface GlobalComponents {
    DInput: typeof Input
  }
}
