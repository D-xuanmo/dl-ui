import { AriaAttributes } from 'vue'

declare module 'vue' {
  interface HTMLAttributes extends AriaAttributes {
    className?: string
  }
}
