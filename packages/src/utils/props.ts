/**
 * 选择 props 中的任意属性
 * @param props
 * @param keys
 */
export function pickProps<T extends object, K extends keyof T>(props: T, keys: K[]) {
  const result = {} as Record<K, unknown>
  keys.forEach((key) => {
    result[key] = props[key]
  })
  return result as unknown as { [Key in keyof T]: T[Key] }
}
