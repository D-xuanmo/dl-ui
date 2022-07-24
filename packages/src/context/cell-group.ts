import { InjectionKey } from 'vue'

type CellGroupConfig = {
  /** 单元格标题宽度 */
  cellTitleWidth?: string
}

export const cellGroupInjectKey = Symbol('DFormCellGroup') as InjectionKey<CellGroupConfig>
