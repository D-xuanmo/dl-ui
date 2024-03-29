import { Component, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { MessageThemeEnum } from '../common'

export type MessageProps = ExtractPropTypes<typeof MESSAGE_PROPS>

export const MESSAGE_PROPS = {
  visible: {
    type: Boolean,
    default: false
  },

  /**
   * 消息内容
   */
  content: String,

  /**
   * 自定义消息图标
   */
  icon: {
    type: Object as PropType<Component>,
    default: undefined
  },

  /**
   * 消息提示类型
   */
  type: {
    type: String as PropType<'text' | 'loading'>,
    default: 'text'
  },

  /**
   * 消息主题
   */
  theme: {
    type: String as PropType<MessageThemeEnum>,
    default: ''
  },

  /**
   * 是否显示关闭图标
   */
  closable: {
    type: Boolean,
    default: false
  },

  /**
   * 消息提示时间，单位毫秒
   */
  duration: {
    type: Number,
    default: 2000
  },

  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
}
