import { InjectionKey } from 'vue'
import { DirectionType, HorizontalAlignType } from '@xuanmo/dl-common'

export type GlobalConfigType = {
  /** 主题 */
  theme?: string

  /** 隐藏 label */
  hideLabel?: boolean

  /** label 宽度 */
  labelWidth?: string

  /** 单元格布局，默认：horizontal */
  cellLayout?: DirectionType

  /** 内容对齐方式 */
  contentAlign?: HorizontalAlignType

  /** 遮罩层 z-index */
  zIndex?: number
}

export const GLOBAL_CONFIG_CONTEXT_KEY = Symbol('DLUI') as InjectionKey<GlobalConfigType>
