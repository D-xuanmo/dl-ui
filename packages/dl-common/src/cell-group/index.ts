import CellGroup from './cell-group'
import { withInstall } from '../utils'

export const DCellGroup = withInstall(CellGroup)

export { type CellGroupProps } from './props'

export default DCellGroup

declare module 'vue' {
  export interface GlobalComponents {
    DCellGroup: typeof CellGroup
  }
}
