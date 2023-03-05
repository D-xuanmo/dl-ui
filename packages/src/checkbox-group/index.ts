import CheckboxGroup from './checkbox-group.vue'
import { withInstall } from '../utils/with-install'

export const DCheckboxGroup = withInstall(CheckboxGroup)

export default DCheckboxGroup

declare module 'vue' {
  export interface GlobalComponents {
    DCheckboxGroup: typeof CheckboxGroup
  }
}
