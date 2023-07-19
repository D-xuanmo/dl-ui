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
    ...rest
  } = model
  return rest
}
