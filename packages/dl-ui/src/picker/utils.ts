import { PickerOptions, PickerOption, PickerValue } from './props'
import { isEmpty, isObject } from '@xuanmo/utils'
import { CustomKeys, ICascaderOption, IData } from '@xuanmo/dl-common'

/**
 * 查找默认一级数据
 * @param columns
 * @param keys
 */
export const findCascadeFirstLevelData = (columns: ICascaderOption[], keys?: CustomKeys) => {
  if (isEmpty(columns) || columns.every(isEmpty)) return []
  const firstLevelData: ICascaderOption[] = []
  let level = 0
  const findFirstLevelData = (column: ICascaderOption) => {
    firstLevelData.push(column)
    while (firstLevelData?.[level]) {
      const result = (firstLevelData?.[level] as any)?.[keys?.children || 'children']
      level++
      result && findFirstLevelData(result[0])
    }
  }
  findFirstLevelData(columns[0])
  return firstLevelData
}

/**
 * 处理级联数据
 * @param value 当前选中的值
 * @param columns
 * @param keys
 */
export const formatCascade = (
  value: PickerValue,
  columns: ICascaderOption[],
  keys?: CustomKeys
) => {
  const valueKey = keys?.value || 'value'
  const childrenKey = keys?.children || 'children'
  const formatted: PickerOption[][] = []
  let level = 0
  function findColumns(data: ICascaderOption[]) {
    while (value[level] && data) {
      if (!value[level]) break
      const result =
        data.find((item) => {
          const current = value[level] as IData
          // 传入的 value 为对象数组，取 value 属性
          return (
            (item as any)?.[valueKey] ===
            (isObject(current) ? (current as ICascaderOption).value : current)
          )
        }) ?? data[0]
      level++
      if (result) {
        formatted.push(data)
        value[level - 1] = result
        ;(result as any)?.[childrenKey] && findColumns((result as any)?.[childrenKey])
        break
      }
    }
  }
  findColumns(columns)
  return formatted
}

/**
 * 查找对应数据显示值，耗时方法，一般在数据选择时调用
 * @param value 当前选择的数据
 * @param originalColumns 原始列数据
 * @param keys
 */
export const findDisplayName = (
  value: PickerValue,
  originalColumns: PickerOptions,
  keys?: CustomKeys
) => {
  const labelKey = keys?.label || 'label'
  const valueKey = keys?.value || 'value'
  const labels: string[] = []
  const columns = originalColumns.flat()
  for (let i = 0; i < value.length; i++) {
    const item = value[i] as any
    const label = (
      columns.find((col) => {
        if (isObject(item)) {
          return (item as any)?.[valueKey] === (col as any)?.[valueKey]
        }
        return (col as any)?.[valueKey] === item
      }) as any
    )?.[labelKey]
    label && labels.push(label)
  }
  return labels.join('/')
}
