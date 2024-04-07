import { InjectionKey } from 'vue'
import { ConfigProviderProps } from './props'

export const ConfigProviderInjectKey: InjectionKey<ConfigProviderProps> = Symbol('ConfigProvider')
