import { ExtractPropTypes } from 'vue'
import { pickProps } from '../utils'
import { FORM_PROPS } from '../form'

export type ConfigProviderProps = ExtractPropTypes<typeof CONFIG_PROVIDER_PROPS>

export const CONFIG_PROVIDER_PROPS = {
  ...pickProps(FORM_PROPS, ['colon', 'requiredMarkPosition', 'layout', 'labelWidth'])
}
