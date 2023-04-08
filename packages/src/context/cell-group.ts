import { InjectionKey } from 'vue'
import { HorizontalAlignType } from '../common'

type CellGroupConfig = {
  /** 单元格标题宽度 */
  cellTitleWidth?: string

  /** 内容对齐方式 */
  cellContentAlign?: HorizontalAlignType
}

export const CELL_GROUP_CONTEXT_KEY = Symbol('DFormCellGroup') as InjectionKey<CellGroupConfig>
