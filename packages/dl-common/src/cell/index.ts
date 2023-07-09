import Cell from './cell'
import { withInstall } from '../utils'

export const DCell = withInstall(Cell)

export { type CellProps } from './props'

export default DCell

declare module 'vue' {
  export interface GlobalComponents {
    DCell: typeof Cell
  }
}
