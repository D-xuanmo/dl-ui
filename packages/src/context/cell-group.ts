import { InjectionKey } from 'vue'
import { CellGroupProps } from '../cell-group'

type CellGroupConfig = Pick<
  CellGroupProps,
  'cellTitleWidth' | 'cellContentAlign' | 'layout' | 'border'
>

export const CELL_GROUP_CONTEXT_KEY = Symbol('DFormCellGroup') as InjectionKey<
  Partial<CellGroupConfig>
>
