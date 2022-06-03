import _Input from './input.vue'
import { withInstall } from '../utils/with-install'

const Input = withInstall(_Input)

export default Input

declare module 'vue' {
  export interface GlobalComponents {
    DInput: typeof _Input
  }
}
