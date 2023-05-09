import { PickerColumnsType, PickerColumnType, PickerValueType } from './props'
import { isObject } from '@xuanmo/javascript-utils'
import { CascadeOption, DataType } from '../common'

/**
 * 查找默认一级数据
 * @param columns
 */
export const findCascadeFirstLevelData = (columns: CascadeOption[]) => {
  const firstLevelData: CascadeOption[] = []
  let level = 0
  const findFirstLevelData = (column: CascadeOption) => {
    firstLevelData.push(column)
    while (firstLevelData?.[level]) {
      const result = firstLevelData?.[level]?.children
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
 */
export const formatCascade = (value: PickerValueType, columns: CascadeOption[]) => {
  const formatted: PickerColumnType[][] = []
  let level = 0
  function findColumns(data: CascadeOption[]) {
    while (value[level] && data) {
      if (!value[level]) break
      const result =
        data.find((item) => {
          const current = value[level] as DataType
          // 传入的 value 为对象数组，取 value 属性
          return item?.value === (isObject(current) ? (current as CascadeOption).value : current)
        }) ?? data[0]
      level++
      if (result) {
        formatted.push(data)
        value[level - 1] = result
        result?.children && findColumns(result?.children)
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
 */
export const findDisplayName = (value: PickerValueType, originalColumns: PickerColumnsType) => {
  const labels: string[] = []
  const columns = originalColumns.flat()
  for (let i = 0; i < value.length; i++) {
    const item = value[i]
    const label = columns.find((col) => {
      if (isObject(item)) {
        return (item as DataType).value === col.value
      }
      return col.value === item
    })?.label
    label && labels.push(label)
  }
  return labels.join('/')
}
