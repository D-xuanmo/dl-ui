import Cell from './cell'
import { withInstall } from '../utils'

export const DCell = withInstall(Cell)

export default DCell

declare module 'vue' {
  export interface GlobalComponents {
    DCell: typeof Cell
  }
}
