import Button from './button.vue'
import { withInstall } from '../utils'

export const DButton = withInstall(Button)

export { type ButtonProps } from './props'

export default DButton

declare module 'vue' {
  export interface GlobalComponents {
    DButton: typeof Button
  }
}
