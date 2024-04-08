import { CellProps } from './props'
import { computed, inject } from 'vue'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'
import { useConfig } from '../hooks'

export const useGlobalConfig = (props: CellProps) => {
  const { cellTitleWidth, cellContentAlign, layout, border } = inject(CELL_GROUP_CONTEXT_KEY, {})
  const config = useConfig(['layout', 'labelWidth', 'requiredMarkPosition'], props as any)
  return computed(() => {
    return {
      hideTitle: props.hideTitle,
      border: props.border ?? border,
      contentAlign: props.contentAlign || cellContentAlign || 'left',
      labelWidth: props.titleWidth || cellTitleWidth || config.value.labelWidth,
      layout: props.layout || layout?.value || config.value.layout || 'horizontal',
      requiredMarkPosition: props.requiredMarkPosition || config.value.requiredMarkPosition
    }
  })
}
