import Form from './form.vue'
import { withInstall } from '../utils'

export const DForm = withInstall(Form)

export type { FormProps } from './props'

export default DForm

declare module 'vue' {
  export interface GlobalComponents {
    DForm: typeof Form
  }
}
