import { ExtractPropTypes } from 'vue'
import { COMMON_PROPS, pickProps } from '@xuanmo/dl-common'

export type TabsProps = ExtractPropTypes<typeof TABS_PROPS>
export type TabPanelProps = ExtractPropTypes<typeof TAB_PANEL_PROPS>

export const TABS_PROPS = {
  ...pickProps(COMMON_PROPS, ['round']),
  modelValue: {
    type: [String, Number],
    default: undefined
  },
  sticky: {
    type: Boolean,
    default: false
  }
}

export const TAB_PANEL_PROPS = {
  name: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  }
}
