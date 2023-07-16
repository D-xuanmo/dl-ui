import { ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { MessageThemeEnum } from '../common'

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
   * 关闭按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消'
  },

  /**
   * 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认'
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
   * 指定挂载节点
   */
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
}
