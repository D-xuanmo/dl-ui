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
  store: {
    type: Object as PropType<FormStore>
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80
  },
  layout: String as PropType<DirectionType>,
  colon: Boolean,
  requiredMarkPosition: {
    type: String as PropType<Exclude<HorizontalAlignType, 'center'>>,
    default: 'right'
  },
  hideLabel: Boolean,
  round: {
    type: Boolean,
    default: true
  },
  hasBackground: {
    type: Boolean,
    default: true
  }
}
