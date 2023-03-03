import RadioGroup from './radio-group.vue'
import { withInstall } from '../utils/with-install'

export const DRadioGroup = withInstall(RadioGroup)

export default DRadioGroup

declare module 'vue' {
  export interface GlobalComponents {
    DRadioGroup: typeof RadioGroup
  }
}
