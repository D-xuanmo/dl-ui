import { CellProps } from './props'
import { computed, inject } from 'vue'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'
import { useConfig } from '../hooks'
import { ClientTypeEnum } from '../constants'

export const useGlobalConfig = (props: CellProps) => {
  const { cellTitleWidth, cellContentAlign, layout, border, round } = inject(
    CELL_GROUP_CONTEXT_KEY,
    {}
  )
  const config = useConfig(
    [
      'layout',
      'labelWidth',
      'requiredMarkPosition',
      'clientType',
      'border',
      'round',
      'useCustomDescription',
      'renderCellTitle'
    ],
    props as any
  )
  return computed(() => {
    const clientType = props.clientType || config.value.clientType
    return {
      clientType: props.clientType || config.value.clientType,
      hideTitle: props.hideTitle,
      border: props.border ?? border ?? config.value.border,
      round: clientType === ClientTypeEnum.PC ? false : props.round ?? round ?? config.value.round,
      contentAlign: props.contentAlign || cellContentAlign || 'left',
      labelWidth: props.titleWidth || cellTitleWidth || config.value.labelWidth,
      layout: props.layout || layout?.value || config.value.layout || 'horizontal',
      requiredMarkPosition: props.requiredMarkPosition || config.value.requiredMarkPosition,
      useCustomDescription: props.useCustomDescription || config.value.useCustomDescription,
      renderCellTitle: props.renderCellTitle || config.value.renderCellTitle
    }
  })
}
