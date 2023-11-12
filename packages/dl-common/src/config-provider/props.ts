import { ExtractPropTypes, PropType } from 'vue'
import { pickProps } from '../utils'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'
import { DEFAULT_REQUIRED_MARK_POSITION, LABEL_WIDTH } from '../constants'

export type ConfigProviderTheme = {
  // 主题色
  primary?: string

  // 成功提示
  success?: string

  // 警告提示
  warning?: string

  // 错误提示
  error?: string
}

export type ConfigProviderProps = ExtractPropTypes<typeof CONFIG_PROVIDER_PROPS>

export const CONFIG_PROVIDER_PROPS = {
  ...pickProps(COMMON_PROPS, ['keys']),

  /**
   * 表单宽度
   */
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: LABEL_WIDTH
  },

  /**
   * 标题布局类型
   */
  layout: {
    type: String as PropType<DirectionType>,
    default: 'horizontal'
  },

  /**
   * 必填标识位置
   */
  requiredMarkPosition: {
    type: String as PropType<Exclude<HorizontalAlignType, 'center'>>,
    default: DEFAULT_REQUIRED_MARK_POSITION
  },

  /**
   * 是否显示冒号
   */
  colon: {
    type: Boolean,
    default: false
  },

  /**
   * 主题颜色
   */
  theme: {
    type: Object as PropType<ConfigProviderTheme>,
    default: undefined
  }
}
