import Message from './message.vue'
import { withInstall } from '../utils'

export const DMessage = withInstall(Message)

export { type MessageProps } from './props'

export * from './function-call'

export default DMessage

declare module 'vue' {
  export interface GlobalComponents {
    DMessage: typeof Message
  }
}
