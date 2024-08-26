import { ExtractPropTypes, PropType } from 'vue'
import { pickProps } from '../utils'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'
import { DEFAULT_REQUIRED_MARK_POSITION } from '../constants'

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
  ...pickProps(COMMON_PROPS, [
    'keys',
    'clientType',
    'labelWidth',
    'border',
    'round',
    'separator',
    'closeOnEsc',
    'direction',
    'idGenerator'
  ]),

  /**
   * 是否需要创建真实 DOM
   */
  createNode: {
    type: Boolean,
    default: true
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
  },

  /**
   * 是否为顶级组件
   */
  isRoot: {
    type: Boolean,
    default: true
  },

  /**
   * 高度是否撑满
   */
  fullHeight: {
    type: Boolean,
    default: true
  }
}
