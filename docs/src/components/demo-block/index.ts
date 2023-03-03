import DemoBlock from './demo-block.vue'
import { withInstall } from '@/utils/with-install'

const DDemoBlock = withInstall(DemoBlock)

export default DDemoBlock

declare module 'vue' {
  export interface GlobalComponents {
    DDemoBlock: typeof DemoBlock
  }
}
