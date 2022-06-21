import _Picker from './picker.vue'
import { withInstall } from '../utils/with-install'

const Picker = withInstall(_Picker)

export { type PickerColumnsType, type PickerColumnType } from './props'

export default Picker

declare module 'vue' {
  export interface GlobalComponents {
    DPicker: typeof _Picker
  }
}
