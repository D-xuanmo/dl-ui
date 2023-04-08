import Upload from './upload.vue'
import { withInstall } from '../utils'

export const DUpload = withInstall(Upload)

export type { UploadProps } from './props'

export default DUpload

declare module 'vue' {
  export interface GlobalComponents {
    DUpload: typeof Upload
  }
}
