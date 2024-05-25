import ActionSheet from './action-sheet.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DActionSheet = withInstall(ActionSheet)

export { type ActionSheetProps } from './props'

export * from './types'
export * from './function-call'

declare module 'vue' {
  export interface GlobalComponents {
    DActionSheet: typeof ActionSheet
  }
}
