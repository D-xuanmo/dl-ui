import RadioGroup from './radio-group.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DRadioGroup = withInstall(RadioGroup)

export { type RadioGroupProps } from './props'

export default DRadioGroup

declare module 'vue' {
  export interface GlobalComponents {
    DRadioGroup: typeof RadioGroup
  }
}
