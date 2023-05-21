import { createNamespace } from '@doc/utils'
import { PLAYGROUND_SHORT_URL } from '@doc/constants'

const [name, bem] = createNamespace('doc-preview')

export { name, bem as createBEM }

export const generatePlaygroundURL = (key: string) => `${PLAYGROUND_SHORT_URL}${key}`
