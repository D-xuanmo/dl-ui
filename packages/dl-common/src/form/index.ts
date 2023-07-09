import { withInstall } from '../utils'
import Form from './form.vue'
import FormCellGroup from './components/form-cell-group/index.vue'
import GridLayout from './components/grid-layout/index.vue'

export const DForm = withInstall(Form)
export const DFormCellGroup = withInstall(FormCellGroup)
export const DGridLayout = withInstall(GridLayout)

export type { FormProps } from './props'

export { FormStore } from './store'

export * from './types'

export default DForm

declare module 'vue' {
  export interface GlobalComponents {
    DForm: typeof Form
  }
}
