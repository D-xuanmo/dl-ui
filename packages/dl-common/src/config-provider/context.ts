import { InjectionKey } from 'vue'
import { ConfigProviderProps } from './props'

export const ConfigProviderInjectKey = Symbol(
  'config-provider'
) as InjectionKey<ConfigProviderProps>
