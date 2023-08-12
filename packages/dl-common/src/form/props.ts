import { ExtractPropTypes, PropType } from 'vue'
import { FormModels } from './types'
import type { FormStore } from './store'
import { COMMON_PROPS, DirectionType, HorizontalAlignType } from '../common'

export type FormProps = ExtractPropTypes<typeof FORM_PROPS>

export const FORM_PROPS = {
  ...COMMON_PROPS,
  models: {
    type: Array as PropType<FormModels>,
    required: true,
    default: () => []
  },
  store: Object as PropType<FormStore>,
  labelWidth: [Number, String] as PropType<number | string>,
  layout: String as PropType<DirectionType>,
  colon: {
    type: Boolean,
    default: undefined
  },
  requiredMarkPosition: String as PropType<Exclude<HorizontalAlignType, 'center'>>,
  hideLabel: Boolean,
  round: {
    type: Boolean,
    default: true
  },
  hasBackground: {
    type: Boolean,
    default: true
  },
  clientType: {
    type: String as PropType<'PC' | 'MOBILE'>,
    default: 'PC'
  }
}
