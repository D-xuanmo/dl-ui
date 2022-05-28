import _Cell from './cell'
import { withInstall } from '@/utils/with-install'

const Cell = withInstall(_Cell)

export default Cell

declare module 'vue' {
  export interface GlobalComponents {
    DCell: typeof _Cell
  }
}
