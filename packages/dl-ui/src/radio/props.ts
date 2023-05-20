import { ExtractPropTypes, PropType } from 'vue'

export type RadioProps = ExtractPropTypes<typeof RADIO_PROPS>

export const RADIO_PROPS = {
  /**
   * 单选框值
   */
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },

  /**
   * 单选框显示文字
   */
  label: String,

  /**
   * 是否默认选中
   */
  defaultChecked: Boolean,

  /**
   * 是否禁用
   */
  disabled: Boolean,

  name: String
}
