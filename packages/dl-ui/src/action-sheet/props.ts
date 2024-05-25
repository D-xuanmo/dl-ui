import { ExtractPropTypes, PropType } from 'vue'
import { ActionSheetOptions, IActionSheetOption } from './types'
import { COMMON_PROPS, HorizontalAlignType, pickProps } from '@xuanmo/dl-common'

export type ActionSheetProps = ExtractPropTypes<typeof ACTION_SHEET_PROPS>

export const ACTION_SHEET_PROPS = {
  ...pickProps(COMMON_PROPS, ['keys']),
  /**
   * 面板显示隐藏
   */
  visible: {
    type: Boolean,
    default: false
  },

  /**
   * 面板选项数据
   */
  options: {
    type: Array as PropType<ActionSheetOptions>,
    default: () => []
  },

  /**
   * 对齐方式
   */
  align: {
    type: String as PropType<Extract<HorizontalAlignType, 'left' | 'center'>>,
    default: 'center'
  },

  /**
   * 显示关闭按钮
   */
  showCancel: {
    type: Boolean,
    default: true
  },

  /**
   * 取消按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消'
  },

  /**
   * 面板描述
   */
  description: {
    type: String,
    default: ''
  },

  /**
   * 选择完成事件
   */
  onSelected: {
    type: Function as PropType<(item: IActionSheetOption, index: number) => void>,
    default: undefined
  },

  /**
   * 关闭事件
   */
  onCancel: {
    type: Function as PropType<() => void>,
    default: undefined
  }
}
