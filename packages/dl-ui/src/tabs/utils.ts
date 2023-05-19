import { createBEM, createNamespace, Modifiers } from '@xuanmo/dl-common'

function createTabsNameSpace(): [string, ReturnType<typeof createBEM>]

function createTabsNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers, only?: boolean) => string]

function createTabsNameSpace(childName?: string) {
  const [name, bem] = createNamespace('tabs')
  if (childName) {
    return [
      createNamespace(`tabs-${childName}`)[0],
      (el = childName, modifier?: Modifiers, only?: boolean) => bem(el, modifier, only)
    ]
  }
  return [name, bem]
}

export { createTabsNameSpace }
