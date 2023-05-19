import Checkbox from './checkbox.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DCheckbox = withInstall(Checkbox)

export { type CheckboxProps } from './props'

export default DCheckbox

declare module 'vue' {
  export interface GlobalComponents {
    DCheckbox: typeof Checkbox
  }
}
