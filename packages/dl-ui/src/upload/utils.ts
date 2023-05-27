import { createBEM, createNamespace, Modifiers } from '@xuanmo/dl-common'

function createUploadNameSpace(): [string, ReturnType<typeof createBEM>]

function createUploadNameSpace(
  childName: string
): [string, (el?: string | null, modifier?: Modifiers) => string]

function createUploadNameSpace(childName?: string) {
  const [name, bem] = createNamespace('upload')
  if (childName) {
    return [
      createNamespace(`upload-${childName}`)[0],
      (el = childName, modifier?: Modifiers) => bem(el, modifier)
    ]
  }
  return [name, bem]
}

export { createUploadNameSpace }
