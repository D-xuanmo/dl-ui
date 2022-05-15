import _Example from './Example.vue'
import _ExampleBEM from './ExampleBEM.vue'
import { withInstall } from '@/utils/with-install'

const Example = withInstall(_Example)
const ExampleBEM = withInstall(_ExampleBEM)

export { Example, ExampleBEM }

declare module 'vue' {
  export interface GlobalComponents {
    DExample: typeof Example
  }
}
