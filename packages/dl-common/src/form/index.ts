import { withInstall } from '../utils'
import Form from './form.vue'
import FormItem from './components/form-item.vue'
import FormCellGroup from './layout/form-cell-group/index.vue'
import FormGrid from './layout/form-grid/index.vue'
import DetailTableWrapper from './components/detail-table-wrapper.vue'

export const DForm = withInstall(Form)
export const DFormCellGroup = withInstall(FormCellGroup)
export const DFormGrid = withInstall(FormGrid)
export const DFormItem = withInstall(FormItem)
export const DDetailTableWrapper = withInstall(DetailTableWrapper)

export * from './layout/form-layout'
export * from './hooks'

export { type FormProps, FORM_PROPS } from './props'

export * from './store'
export * from './types'

declare module 'vue' {
  export interface GlobalComponents {
    DForm: typeof Form
    DFormItem: typeof FormItem
  }
}
