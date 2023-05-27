import { createBEM, createNamespace, Modifiers } from '@xuanmo/dl-common'

function createTabsNameSpace(): [string, ReturnType<typeof createBEM>]

function createTabsNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers) => string]

function createTabsNameSpace(childName?: string) {
  const [name, bem] = createNamespace('tabs')
  if (childName) {
    return [
      createNamespace(`tabs-${childName}`)[0],
      (el = childName, modifier?: Modifiers) => bem(el, modifier)
    ]
  }
  return [name, bem]
}

export { createTabsNameSpace }
