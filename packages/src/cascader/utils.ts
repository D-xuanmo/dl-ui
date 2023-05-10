import { createBEM, createNamespace, Modifiers } from '../utils'
import { CascadeOption, DataType } from '../common'

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
 * 级联数据转换为 map 结构
 * @param originalOptions
 */
export const cascaderOptionsToMap = (originalOptions: CascadeOption[]) => {
  const optionsMap = new Map<DataType['value'], CascadeOption>()
  const formatOptions = (options: CascadeOption[]) => {
    options.forEach((item) => {
      optionsMap.set(item.value, item)
      if (Array.isArray(item.children)) {
        formatOptions(item.children)
      }
    })
  }
  formatOptions(originalOptions)
  return optionsMap
}

export { createCascaderNameSpace }
