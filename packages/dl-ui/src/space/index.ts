import Space from './space'
import { withInstall } from '@xuanmo/dl-common'

export const DSpace = withInstall(Space)

export type { SpaceAlignType, SpaceJustifyType, SpaceProps } from './props'

export default DSpace

declare module 'vue' {
  export interface GlobalComponents {
    DSpace: typeof Space
  }
}
