import { PropType } from 'vue'

export const radioProps = {
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

  /**
   * 图标名
   */
  icon: String,
  name: String
}
