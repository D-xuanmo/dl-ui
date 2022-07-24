import { CascadeDataType, PickerColumnType, PickerValueType } from './props'
import { isObject } from '@xuanmo/javascript-utils'
import { DataType } from '../common'

/**
 * 处理级联数据
 * @param value 当前选中的值
 * @param columns
 */
export const formatCascade = (value: PickerValueType, columns: CascadeDataType[]) => {
  const formatted: PickerColumnType[][] = []
  let level = 0
  function findColumns(data: CascadeDataType[]) {
    while (value[level] && data) {
      if (!value[level]) break
      const result =
        data.find((item) => {
          const current = value[level] as DataType
          // 传入的 value 为对象数组，取 value 属性
          return item?.value === (isObject(current) ? (current as CascadeDataType).value : current)
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
