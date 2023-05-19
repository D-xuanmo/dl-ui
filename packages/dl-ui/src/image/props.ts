import { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export type ImageProps = ExtractPropTypes<typeof IMAGE_PROPS>

export const IMAGE_PROPS = {
  /**
   * 图片宽度，为数字时，单位：px
   */
  width: {
    type: [String, Number],
    default: ''
  },

  /**
   * 图片高度，为数字时，单位：px
   */
  height: {
    type: [String, Number],
    default: ''
  },

  /**
   * 图片地址
   */
  src: {
    type: String,
    default: ''
  },

  /**
   * 图片错误展示文本，原始属性
   */
  alt: {
    type: String,
    default: ''
  },

  /**
   * 填充模式
   */
  fit: {
    type: String as PropType<CSSProperties['object-fit']>,
    default: 'fill'
  },

  /**
   * 元素位置
   */
  position: {
    type: String as PropType<CSSProperties['object-position']>,
    default: ''
  },

  /**
   * 圆角大小，为数字时，单位：px
   */
  radius: [String, Number],

  /**
   * 是否为圆形
   */
  round: Boolean,

  /**
   * 是否显示加载中状态，外部控制
   */
  showLoading: Boolean,

  /**
   * 加载中图标，默认：loading-2
   */
  loadingIcon: {
    type: String,
    default: 'loading-2'
  },

  /**
   * 是否显示加载失败，外部控制
   */
  showError: Boolean,

  /**
   * 加载失败图标
   */
  errorIcon: {
    type: String,
    default: 'image-fail'
  },

  /**
   * 加载失败文案
   */
  errorText: {
    type: String,
    default: '加载失败'
  }
}
