import { InjectionKey } from 'vue'

export type FormGlobalConfigType = {
  theme?: string
}

export const globalConfigKey = Symbol('DForm') as InjectionKey<FormGlobalConfigType>
