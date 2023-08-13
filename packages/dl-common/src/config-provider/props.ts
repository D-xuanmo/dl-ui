import { ExtractPropTypes, PropType } from 'vue'
import { pickProps } from '../utils'
import { FORM_PROPS } from '../form'
import { COMMON_PROPS } from '../common'

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
  ...pickProps(FORM_PROPS, ['colon', 'requiredMarkPosition', 'layout', 'labelWidth']),
  ...pickProps(COMMON_PROPS, ['keys']),

  /**
   * 主题颜色
   */
  theme: {
    type: Object as PropType<ConfigProviderTheme>,
    default: undefined
  }
}
