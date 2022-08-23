import _Button from './button.vue'
import { withInstall } from '../utils/with-install'

const Button = withInstall(_Button)

export default Button

declare module 'vue' {
  export interface GlobalComponents {
    DButton: typeof _Button
  }
}
