import { withInstall } from '@xuanmo/dl-common'
import Grid from './grid.vue'
import GridItem from './grid-item.vue'

export const DGrid = withInstall(Grid)
export const DGridItem = withInstall(GridItem)

export { type GridProps } from './props'

export default DGrid

declare module 'vue' {
  export interface GlobalComponents {
    DGrid: typeof Grid
    DGridItem: typeof GridItem
  }
}
