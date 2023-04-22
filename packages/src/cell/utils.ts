import { CellProps } from './props'
import { inject } from 'vue'
import { CELL_GROUP_CONTEXT_KEY, GLOBAL_CONFIG_CONTEXT_KEY } from '../context'

export const useGlobalConfig = (props: CellProps) => {
  const globalConfig = inject(GLOBAL_CONFIG_CONTEXT_KEY) ?? {}
  const { cellTitleWidth, cellContentAlign, layout, border } = inject(CELL_GROUP_CONTEXT_KEY) ?? {}
  return {
    labelWidth: props.titleWidth || cellTitleWidth || globalConfig.labelWidth,
    contentAlign: props.contentAlign || cellContentAlign || globalConfig.contentAlign || 'left',
    hideTitle: props.hideTitle || globalConfig.hideLabel,
    layout: props.layout || layout || globalConfig.cellLayout,
    border: props.border || border
  }
}
