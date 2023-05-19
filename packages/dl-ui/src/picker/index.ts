import Picker from './picker.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DPicker = withInstall(Picker)

export { type PickerOptions, type PickerOption, type PickerProps } from './props'

export default DPicker

declare module 'vue' {
  export interface GlobalComponents {
    DPicker: typeof Picker
  }
}
