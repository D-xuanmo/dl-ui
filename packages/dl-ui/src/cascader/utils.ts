import { createBEM, createNamespace, Modifiers } from '@xuanmo/dl-common'
import { ICascaderOption, IData } from '@xuanmo/dl-common'

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
export const cascaderOptionsToMap = (originalOptions: ICascaderOption[]) => {
  const optionsMap = new Map<IData['value'], ICascaderOption>()
  const formatOptions = (options: ICascaderOption[]) => {
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
