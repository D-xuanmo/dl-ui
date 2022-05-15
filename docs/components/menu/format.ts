/**
 * 格式化菜单标题
 * @param s
 */
export const format = (s: string) => {
  const { name, describe } = /(?<name>[a-z]+).+\[(?<describe>.+)\]/gi.exec(s)?.groups ?? {}

  return { name, describe } as { name: string; describe: string }
}
