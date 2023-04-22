import { InjectionKey, Ref } from 'vue'
import { CellGroupProps } from '../cell-group'
import { DirectionType } from '../common'

interface CellGroupConfig
  extends Pick<CellGroupProps, 'cellTitleWidth' | 'cellContentAlign' | 'border'> {
  layout: Ref<DirectionType>
}

export const CELL_GROUP_CONTEXT_KEY = Symbol('DFormCellGroup') as InjectionKey<
  Partial<CellGroupConfig>
>
