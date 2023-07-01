import { ExtractPropTypes } from 'vue'

export type GridProps = ExtractPropTypes<typeof GRID_PROPS>

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
