import { ExtractPropTypes, PropType, VNode } from 'vue'
import { ButtonProps } from '../button'
import { COMMON_PROPS, PlacementEnum } from '../common'
import { pickProps } from '../utils'

export type DrawerProps = ExtractPropTypes<typeof DRAWER_PROPS>

export const DRAWER_PROPS = {
  ...pickProps(COMMON_PROPS, ['lockScroll', 'teleport']),
  /**
   * 弹框显示隐藏
   */
  visible: {
    type: Boolean,
    default: false
  },

  /**
   * 抽屉标题
   */
  title: {
    type: String,
    default: '提示'
  },

  /**
   * 抽屉内容
   */
  content: {
    type: String,
    default: ''
  },

  /**
   * 控制按钮 loading
   */
  loading: {
    type: Boolean,
    default: false
  },

  /**
   * 关闭按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消'
  },

  /**
   * 关闭按钮 props
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps> | undefined>,
    default: () => ({})
  },

  /**
   * 隐藏取消按钮
   */
  hideCancelButton: {
    type: Boolean,
    default: false
  },

  /**
   * 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认'
  },

  /**
   * 确认按钮 props
   */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps> | undefined>,
    default: () => ({})
  },

  /**
   * 隐藏确认按钮
   */
  hideConfirmButton: {
    type: Boolean,
    default: false
  },

  /**
   * 是否显示关闭图标
   */
  closable: {
    type: Boolean,
    default: true
  },

  /**
   * 是否按下 esc 关闭抽屉
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },

  /**
   * 点击遮罩层是否关闭抽屉
   */
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },

  /**
   * 是否显示遮罩层
   */
  showOverlay: {
    type: Boolean,
    default: true
  },

  /**
   * 关闭抽屉是否销毁子元素
   */
  destroyOnClose: {
    type: Boolean,
    default: false
  },

  /**
   * 抽屉宽度
   */
  width: {
    type: [Number, String],
    default: 300
  },

  /**
   * 抽屉高度
   */
  height: {
    type: [Number, String],
    default: undefined
  },

  /**
   * 抽屉位置
   */
  placement: {
    type: String as PropType<Exclude<PlacementEnum, 'center' | 'custom'>>,
    default: 'right'
  },

  /**
   * 显示底部
   */
  footer: {
    type: [Boolean, Object] as PropType<boolean | VNode[]>,
    default: true
  },

  /**
   * 确认事件
   */
  onConfirm: {
    type: Function as PropType<() => void | Promise<boolean | undefined>>,
    default: undefined
  },

  /**
   * 关闭事件
   */
  onClose: {
    type: Function as PropType<() => void>,
    default: undefined
  }
}
