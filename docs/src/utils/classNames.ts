import { createNamespace } from './bem'

export const classNames = (() => {
  const [, bem] = createNamespace('doc')
  return bem
})()
