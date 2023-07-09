import { CellProps } from './props'
import { inject } from 'vue'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'

export const useGlobalConfig = (props: CellProps) => {
  const { cellTitleWidth, cellContentAlign, layout, border } = inject(CELL_GROUP_CONTEXT_KEY, {})
  return {
    labelWidth: props.titleWidth || cellTitleWidth,
    contentAlign: props.contentAlign || cellContentAlign || 'left',
    hideTitle: props.hideTitle,
    layout: props.layout || layout?.value,
    border: props.border || border
  }
}
