import Cell from './cell'
import { withInstall } from '../utils/with-install'

export const DCell = withInstall(Cell)

export default DCell

declare module 'vue' {
  export interface GlobalComponents {
    DCell: typeof Cell
  }
}
