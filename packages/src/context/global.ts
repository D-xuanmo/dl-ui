import { InjectionKey } from 'vue'

export type FormGlobalConfigType = {
  /** 主题 */
  theme?: string

  /** 隐藏 label */
  hideLabel?: boolean

  /** label 宽度 */
  labelWidth?: string

  /** 遮罩层 z-index */
  zIndex?: number
}

export const GLOBAL_CONFIG_CONTEXT_KEY = Symbol('DForm') as InjectionKey<FormGlobalConfigType>
