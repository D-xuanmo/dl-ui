import { Fragment, VNode } from 'vue'

export const findChildren = (children: VNode[], result: any[] = []) => {
  children.forEach((item: any) => {
    if (item.type === Fragment && Array.isArray(item.children)) {
      findChildren(item.children as VNode[], result)
    }
    if (item.type !== Fragment) {
      result.push(item)
    }
  })
  return result
}
