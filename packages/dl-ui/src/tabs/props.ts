import { ExtractPropTypes } from 'vue'

export type TabsProps = ExtractPropTypes<typeof TABS_PROPS>
export type TabPanelProps = ExtractPropTypes<typeof TAB_PANEL_PROPS>

export const TABS_PROPS = {
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
