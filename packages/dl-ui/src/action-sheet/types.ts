import { ButtonProps, IData } from '@xuanmo/dl-common'
import { VNode } from 'vue'

export interface IActionSheetOption extends IData {
  /**
   * 图标
   */
  icon?: VNode

  /**
   * 数据状态
   */
  status?: ButtonProps['theme']
}

export type ActionSheetOptions = IActionSheetOption[]
