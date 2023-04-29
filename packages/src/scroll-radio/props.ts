import { PropType } from 'vue'
import { pickProps } from '../utils'
import { DataType } from '../common'

export const SCROLL_RADIO_PROPS = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },

  options: {
    type: Array as PropType<DataType[]>,
    required: true,
    default: () => []
  },

  /**
   * 选项单个高度
   */
  optionHeight: {
    type: Number,
    default: 42
  }
}

export const SCROLL_RADIO_ITEM_PROPS = {
  option: {
    type: Object as PropType<DataType>,
    default: () => ({})
  },
  ...pickProps(SCROLL_RADIO_PROPS, ['optionHeight'])
}
