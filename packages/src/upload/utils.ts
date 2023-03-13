import { createBEM, createNamespace, Modifiers } from '../utils'

function createUploadNameSpace(): [string, ReturnType<typeof createBEM>]

function createUploadNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers, only?: boolean) => string]

function createUploadNameSpace(childName?: string) {
  const [name, bem] = createNamespace('upload')
  if (childName) {
    return [
      createNamespace(`upload-${childName}`)[0],
      (el = childName, modifier?: Modifiers, only?: boolean) => bem(el, modifier, only)
    ]
  }
  return [name, bem]
}

export { createUploadNameSpace }
