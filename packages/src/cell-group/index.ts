import _CellGroup from './cell-group'
import { withInstall } from '../utils/with-install'

const CellGroup = withInstall(_CellGroup)

export default CellGroup

declare module 'vue' {
  export interface GlobalComponents {
    DCellGroup: typeof _CellGroup
  }
}
