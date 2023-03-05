import CellGroup from './cell-group'
import { withInstall } from '../utils'

export const DCellGroup = withInstall(CellGroup)

export default DCellGroup

declare module 'vue' {
  export interface GlobalComponents {
    DCellGroup: typeof CellGroup
  }
}
