/**
 * 选择 props 中的任意属性
 * @param props 组件 props
 * @param keys 需要被提取的 keys
 */
export function pickProps<T extends object, K extends keyof T>(props: T, keys: K[]) {
  return keys.reduce((prev, key) => ({ ...prev, [key]: props[key] }), {}) as { [Key in K]: T[Key] }
}
