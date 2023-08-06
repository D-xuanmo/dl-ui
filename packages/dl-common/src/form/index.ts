import { withInstall } from '../utils'
import Form from './form.vue'
import FormItem from './components/form-item.vue'
import FormCellGroup from './layout/form-cell-group/index.vue'
import FormGrid from './layout/form-grid/index.vue'

export const DForm = withInstall(Form)
export const DFormCellGroup = withInstall(FormCellGroup)
export const DFormGrid = withInstall(FormGrid)
export const DFormItem = withInstall(FormItem)

export * from './layout/form-layout'

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
