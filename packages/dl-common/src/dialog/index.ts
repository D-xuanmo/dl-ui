import Dialog from './dialog.tsx'
import { withInstall } from '../utils'

export const DDialog = withInstall(Dialog)

export { type DialogProps } from './props'

export * from './function-call'

export default DDialog

declare module 'vue' {
  export interface GlobalComponents {
    DDialog: typeof Dialog
  }
}
