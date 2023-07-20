import { ExtractPropTypes, PropType, TeleportProps, VNode } from 'vue'
import { MessageThemeEnum } from '../common'
import { ButtonProps } from '../button'

export type DialogProps = ExtractPropTypes<typeof DIALOG_PROPS>

export const DIALOG_PROPS = {
  /**
   * 弹框显示隐藏
   */
  visible: {
    type: Boolean,
    default: false
  },

  /**
   * 对话框标题
   */
  title: {
    type: String,
    default: '提示'
  },

  /**
   * 对话框内容
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
   * 是否按下 esc 关闭对话框
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },

  /**
   * 点击遮罩层是否关闭对话框
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
   * 主题
   */
  theme: {
    type: String as PropType<MessageThemeEnum>,
    default: 'info'
  },

  /**
   * 关闭对话框是否销毁子元素
   */
  destroyOnClose: {
    type: Boolean,
    default: false
  },

  /**
   * 对话框宽度
   */
  width: {
    type: [Number, String],
    default: 480
  },

  /**
   * 对话框高度
   */
  height: {
    type: [Number, String],
    default: undefined
  },

  /**
   * 显示对话框图标
   */
  showIcon: {
    type: Boolean,
    default: false
  },

  /**
   * 顶部距离
   */
  top: {
    type: [Number, String],
    default: '20%'
  },

  /**
   * 对话框位置
   * 为 top 时，默认距离顶部 20%
   * 为 center 时，上下左右居中显示
   */
  placement: {
    type: String as PropType<'top' | 'center'>,
    default: 'top'
  },

  /**
   * 指定挂载节点
   */
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
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
    type: Function as PropType<() => void | Promise<boolean>>,
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
