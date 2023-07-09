import { InjectionKey, Ref } from 'vue'
import { CellGroupProps } from './props'
import { DirectionType } from '../common'

interface CellGroupConfig
  extends Pick<CellGroupProps, 'cellTitleWidth' | 'cellContentAlign' | 'border'> {
  layout: Ref<DirectionType>
}

export const CELL_GROUP_CONTEXT_KEY = Symbol('DLuiCellGroup') as InjectionKey<
  Partial<CellGroupConfig>
>
