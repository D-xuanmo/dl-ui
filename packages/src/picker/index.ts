import Picker from './picker.vue'
import { withInstall } from '../utils/with-install'

export const DPicker = withInstall(Picker)

export { type PickerColumnsType, type PickerColumnType } from './props'

export default DPicker

declare module 'vue' {
  export interface GlobalComponents {
    DPicker: typeof Picker
  }
}
