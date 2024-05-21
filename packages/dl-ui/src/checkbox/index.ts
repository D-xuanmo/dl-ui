import Checkbox from './checkbox.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DCheckbox = withInstall(Checkbox)

export { type CheckboxProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DCheckbox: typeof Checkbox
  }
}
