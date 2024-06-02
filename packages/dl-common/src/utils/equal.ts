import { isObject } from '@xuanmo/utils'

/**
 * 判断两个值是否相等。
 * @param source - 源值
 * @param target - 目标值
 * @param diffKey - 差异键名（可选）
 * @returns 如果两个值相等，则返回 true；否则返回 false
 */
export const isEqual = (source: any, target: any, diffKey?: string): boolean => {
  if (Array.isArray(target) && Array.isArray(source)) {
    for (let i = 0; i < target.length; i++) {
      const result = isEqual(source[i], target[i])
      if (!result) return false
    }
  }

  if (isObject(target) && isObject(source)) {
    for (const [key, value] of Object.entries(target)) {
      if (isObject(value) || Array.isArray(value)) {
        const result = isEqual(value, source[key])
        if (!result) return false
      }
      if (diffKey === key) return value === source[key]
    }
  }

  return source === target
}
