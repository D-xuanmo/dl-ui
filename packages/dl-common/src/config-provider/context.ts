import { ComputedRef, InjectionKey } from 'vue'
import { ConfigProviderProps } from './props'

export const ConfigProviderInjectKey: InjectionKey<ComputedRef<ConfigProviderProps>> =
  Symbol('ConfigProvider')
