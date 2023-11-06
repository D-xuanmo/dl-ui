import Loading from './loading.vue'
import { withInstall } from '../utils'

export const DLoading = withInstall(Loading)

export { type LoadingProps } from './props'

export * from './function-call'

declare module 'vue' {
  export interface GlobalComponents {
    DLoading: typeof Loading
  }
}
