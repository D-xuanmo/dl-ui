import ConfigProvider from './config-provider'
import { withInstall } from '../utils'

export const DConfigProvider = withInstall(ConfigProvider)

export { type ConfigProviderProps, type ConfigProviderTheme } from './props'

export * from './context'

export default DConfigProvider

declare module 'vue' {
  export interface GlobalComponents {
    DConfigProvider: typeof ConfigProvider
  }
}
