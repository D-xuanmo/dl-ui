import { IFormModelItem } from './types'

/**
 * 排除掉内部属性，不向下传递
 * @param model
 */
export const omitSystemProps = (model: IFormModelItem) => {
  const {
    id,
    label,
    labelWidth,
    hideLabel,
    component,
    layout,
    display,
    disabled,
    readonly,
    dataKey,
    value,
    required,
    rules,
    errorMessage,
    description,
    rowId,
    ...rest
  } = model
  return rest
}

/**
 * 获取校验错误信息字段 key
 * @param dataKey
 * @param detailTableId
 * @param rowId
 */
export const getMessageKey = (dataKey: string, detailTableId?: string, rowId?: string) => {
  if (detailTableId) return `${detailTableId}.${rowId}.${dataKey}`
  return dataKey
}
