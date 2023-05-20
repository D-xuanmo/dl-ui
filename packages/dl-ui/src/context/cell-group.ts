import { InjectionKey, Ref } from 'vue'
import { CellGroupProps } from '../cell-group'
import { DirectionType } from '@xuanmo/dl-common'

interface CellGroupConfig
  extends Pick<CellGroupProps, 'cellTitleWidth' | 'cellContentAlign' | 'border'> {
  layout: Ref<DirectionType>
}

export const CELL_GROUP_CONTEXT_KEY = Symbol('DLuiCellGroup') as InjectionKey<
  Partial<CellGroupConfig>
>
