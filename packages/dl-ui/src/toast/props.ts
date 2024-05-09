import { Component, ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS, MessageThemeType, pickProps } from '@xuanmo/dl-common'

export type ToastProps = ExtractPropTypes<typeof TOAST_PROPS>

export const TOAST_PROPS = {
  ...pickProps(COMMON_PROPS, ['direction']),
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
    type: String as PropType<Extract<MessageThemeType, 'success' | 'error'> | 'loading'>,
    default: ''
  },

  /**
   * 消息提示时间，单位毫秒
   */
  duration: {
    type: Number,
    default: 2000
  }
}
