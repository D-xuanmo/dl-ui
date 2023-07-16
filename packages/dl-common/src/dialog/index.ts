import Dialog from './dialog.vue'
import { withInstall } from '../utils'

export const DDialog = withInstall(Dialog)

export { type DialogProps } from './props'

export default DDialog

declare module 'vue' {
  export interface GlobalComponents {
    DDialog: typeof Dialog
  }
}
