import { CellProps } from './props'
import { computed, inject } from 'vue'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'
import { useConfig } from '../hooks'

export const useGlobalConfig = (props: CellProps) => {
  const { cellTitleWidth, cellContentAlign, layout, border } = inject(CELL_GROUP_CONTEXT_KEY, {})
  return computed(() => {
    const config = useConfig(['layout', 'labelWidth', 'requiredMarkPosition'], props)
    return {
      labelWidth: props.titleWidth || cellTitleWidth || config.labelWidth,
      contentAlign: props.contentAlign || cellContentAlign || 'left',
      hideTitle: props.hideTitle,
      layout: props.layout || layout?.value || config.layout || 'horizontal',
      border: props.border || border,
      requiredMarkPosition: props.requiredMarkPosition || config.requiredMarkPosition || 'right'
    }
  })
}
