import { createNamespace } from '@/utils'

export const classNames = (() => {
  const [, bem] = createNamespace('doc')
  return bem
})()
