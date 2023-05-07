import { createBEM, createNamespace, Modifiers } from '../utils'
import { CascadeDataType, DataType } from '../common'
import { CascaderValueType } from './props'
import { isEmpty } from '@xuanmo/javascript-utils'

function createCascaderNameSpace(): [string, ReturnType<typeof createBEM>]

function createCascaderNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers, only?: boolean) => string]

function createCascaderNameSpace(childName?: string) {
  const [name, bem] = createNamespace('cascader')
  if (childName) {
    return [
      createNamespace(`cascader-${childName}`)[0],
      (el = childName, modifier?: Modifiers, only?: boolean) => bem(el, modifier, only)
    ]
  }
  return [name, bem]
}

export const findColumnsByValue = (
  value: CascaderValueType[number],
  originalColumns: CascadeDataType[],
  path: CascadeDataType[] = []
) => {
  if (isEmpty(value)) {
    return {
      path: [],
      columns: originalColumns
    }
  }
  for (let i = 0; i < originalColumns.length; i++) {
    const item = originalColumns[i]
    path.push(item)
    if (item.value === value || item.value === (value as DataType)?.value) {
      return {
        path,
        columns: path.length - 2 <= 0 ? originalColumns : path[path.length - 2]?.children ?? []
      }
    }
    const result = findColumnsByValue(value, item.children ?? [], path) as any
    if (result?.columns) {
      return {
        path,
        columns: result.columns as CascadeDataType[]
      }
    }
    path.pop()
  }
}

export { createCascaderNameSpace }
