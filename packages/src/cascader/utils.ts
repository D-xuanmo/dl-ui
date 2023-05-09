import { createBEM, createNamespace, Modifiers } from '../utils'
import { CascadeOption, CascaderObjectValue, CascaderValue } from '../common'
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

/**
 * 通过指定 value 查找对应选项列表和路径
 * @param value 数据
 * @param originalOptions 原始数据源
 * @param path 路径
 */
export const findOptionsByValue = (
  value: CascaderValue[number],
  originalOptions: CascadeOption[],
  path: CascadeOption[] = []
) => {
  if (isEmpty(value)) {
    return {
      path: [],
      options: originalOptions
    }
  }
  for (let i = 0; i < originalOptions.length; i++) {
    const item = originalOptions[i]
    path.push(item)
    if (item.value === value || item.value === (value as CascaderObjectValue[number])?.value) {
      return {
        path,
        options: path.length - 2 <= 0 ? originalOptions : path[path.length - 2]?.children ?? []
      }
    }
    const result = findOptionsByValue(value, item.children ?? [], path) as any
    if (result?.options) {
      return {
        path,
        options: result.options as CascadeOption[]
      }
    }
    path.pop()
  }
}

export { createCascaderNameSpace }
