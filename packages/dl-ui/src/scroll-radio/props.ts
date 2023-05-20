import { PropType } from 'vue'
import { pickProps } from '@xuanmo/dl-common'
import { IData } from '@xuanmo/dl-common'

export const SCROLL_RADIO_PROPS = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },

  options: {
    type: Array as PropType<IData[]>,
    required: true,
    default: () => []
  },

  /**
   * 选项单个高度
   */
  optionHeight: {
    type: Number,
    default: 42
  },

  /**
   * 可见选项个数
   */
  visibleOptionNum: {
    type: Number as PropType<[5, 7][number]>,
    default: 5
  },

  /**
   * 是否需要空白占位，默认需要
   */
  needPlaceholder: {
    type: Boolean,
    default: true
  }
}

export const SCROLL_RADIO_ITEM_PROPS = {
  option: {
    type: Object as PropType<IData>,
    default: () => ({})
  },
  ...pickProps(SCROLL_RADIO_PROPS, ['optionHeight'])
}
