import { ExtractPropTypes, PropType } from 'vue'

export type GridProps = ExtractPropTypes<typeof GRID_PROPS>

export type JustifyEnum = 'left' | 'center' | 'right'

export type AlignEnum = 'top' | 'middle' | 'bottom'

export const GRID_PROPS = {
  /**
   * 网格列数
   */
  columns: {
    type: Number,
    required: true
  },

  /**
   * 显示定义网格每行高度
   */
  rows: {
    type: String,
    default: ''
  },

  /**
   * 间隙
   */
  gap: {
    type: [Number, String],
    default: 0
  },

  /**
   * 行间距
   */
  rowGap: {
    type: [Number, String],
    default: undefined
  },

  /**
   * 列间距
   */
  columnGap: {
    type: [Number, String],
    default: undefined
  },

  /**
   * 水平对齐方式
   */
  justify: {
    type: String as PropType<JustifyEnum>,
    default: 'normal'
  },

  /**
   * 垂直对齐方式
   */
  align: {
    type: String as PropType<AlignEnum>,
    default: 'normal'
  }
}

export const GRID_ITEM_PROPS = {
  /**
   * 占用行数
   */
  row: {
    type: [Number, String],
    default: 1
  },

  /**
   * 占用列数
   */
  column: {
    type: [Number, String],
    default: 1
  },

  height: {
    type: [Number, String],
    default: '100%'
  }
}
