import { createBEM, createNamespace, CustomKeys, Modifiers, ROOT_PARENT } from '@xuanmo/dl-common'
import { ICascaderOption } from '@xuanmo/dl-common'

function createCascaderNameSpace(): [string, ReturnType<typeof createBEM>]

function createCascaderNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers, only?: boolean) => string]

function createCascaderNameSpace(childName?: string) {
  const [name, bem] = createNamespace('cascader')
  if (childName) {
    return [
      createNamespace(`cascader-${childName}`)[0],
      (el = childName, modifier?: Modifiers) => bem(el, modifier)
    ]
  }
  return [name, bem]
}

/**
 * 级联数据转换为 map 结构
 * @param originalOptions
 * @param keys
 */
export const cascaderOptionsToMap = (originalOptions: ICascaderOption[], keys: CustomKeys) => {
  const optionsMap = new Map<ICascaderOption['value'], ICascaderOption>()
  const formatOptions = (
    options: ICascaderOption[],
    level = 1,
    parent: ICascaderOption['value'] = ROOT_PARENT
  ) => {
    options.forEach((item) => {
      const value = item[keys.value as 'value']
      const children = item[keys.children as 'children']
      item.__level = level
      item.__parent = parent
      optionsMap.set(value, item)
      if (Array.isArray(children)) {
        formatOptions(children, level + 1, value)
      }
    })
  }
  formatOptions(originalOptions)
  return optionsMap
}

export { createCascaderNameSpace }
