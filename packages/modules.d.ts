import { AriaAttributes } from 'vue'

declare module 'vue' {
  interface HTMLAttributes extends AriaAttributes {
    className?: string
  }
}

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
