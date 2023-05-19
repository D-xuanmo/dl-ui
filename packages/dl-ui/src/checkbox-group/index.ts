import CheckboxGroup from './checkbox-group.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DCheckboxGroup = withInstall(CheckboxGroup)

export { type CheckboxGroupProps } from './props'

export default DCheckboxGroup

declare module 'vue' {
  export interface GlobalComponents {
    DCheckboxGroup: typeof CheckboxGroup
  }
}
