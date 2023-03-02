import { InjectionKey } from 'vue'

type CellGroupConfig = {
  /** 单元格标题宽度 */
  cellTitleWidth?: string
}

export const CELL_GROUP_KEY = Symbol('DFormCellGroup') as InjectionKey<CellGroupConfig>
