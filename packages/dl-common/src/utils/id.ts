import { createRandomID } from '@xuanmo/utils'

export const getID = (type: string) => `${type}-${createRandomID(6)}`
