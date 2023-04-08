import { InjectionKey } from 'vue'
import { HorizontalAlignType } from '../common'

export type FormGlobalConfigType = {
  /** 主题 */
  theme?: string

  /** 隐藏 label */
  hideLabel?: boolean

  /** label 宽度 */
  labelWidth?: string

  /** 内容对齐方式 */
  contentAlign?: HorizontalAlignType

  /** 遮罩层 z-index */
  zIndex?: number
}

export const GLOBAL_CONFIG_CONTEXT_KEY = Symbol('DForm') as InjectionKey<FormGlobalConfigType>
