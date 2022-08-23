import _DemoBlock from './demo-block.vue'
import { withInstall } from '@/utils/with-install'

const DemoBlock = withInstall(_DemoBlock)

export default DemoBlock

declare module 'vue' {
  export interface GlobalComponents {
    DDemoBlock: typeof _DemoBlock
  }
}
