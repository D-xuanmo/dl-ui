import Toast from './toast.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DToast = withInstall(Toast)
export * from './function-call'

export { type ToastProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DToast: typeof Toast
  }
}
