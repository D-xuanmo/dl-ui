import DemoBlock from './demo-block.vue'
import { withInstall } from '@doc/utils'

const DLDemoBlock = withInstall(DemoBlock)

export default DLDemoBlock

declare module 'vue' {
  export interface GlobalComponents {
    DDemoBlock: typeof DemoBlock
  }
}
