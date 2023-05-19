import Upload from './upload.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DUpload = withInstall(Upload)

export type { UploadProps } from './props'

export default DUpload

declare module 'vue' {
  export interface GlobalComponents {
    DUpload: typeof Upload
  }
}
