import { withInstall } from '../utils'
import Form from './form.vue'
import FormItem from './components/form-item.vue'
import FormCellGroup from './layout/form-cell-group/index.vue'
import GridLayout from './layout/grid-layout/index.vue'

export const DForm = withInstall(Form)
export const DFormCellGroup = withInstall(FormCellGroup)
export const DGridLayout = withInstall(GridLayout)
export const DFormItem = FormItem

export type { FormProps } from './props'

export { FormStore } from './store'

export * from './types'

export default DForm

declare module 'vue' {
  export interface GlobalComponents {
    DForm: typeof Form
    DFormItem: typeof FormItem
  }
}
