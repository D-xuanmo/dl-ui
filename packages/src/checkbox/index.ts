import Checkbox from './checkbox.vue'
import { withInstall } from '../utils/with-install'

export const DCheckbox = withInstall(Checkbox)

export default DCheckbox

declare module 'vue' {
  export interface GlobalComponents {
    DCheckbox: typeof Checkbox
  }
}
