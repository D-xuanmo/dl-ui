import _Example from './example.vue'
import _ExampleBEM from './example-bem.vue'
import { withInstall } from '@/utils/with-install'

const Example = withInstall(_Example)
const ExampleBEM = withInstall(_ExampleBEM)

export { Example, ExampleBEM }

declare module 'vue' {
  export interface GlobalComponents {
    DExample: typeof _Example
  }
}
