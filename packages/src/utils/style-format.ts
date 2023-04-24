import { isNumber } from '@xuanmo/javascript-utils'

/**
 * CSS 添加单位
 * @param value
 */
export const addUnit = (value: string | number | undefined): string => {
  return isNumber(value) ? `${value}px` : (value as string)
}
