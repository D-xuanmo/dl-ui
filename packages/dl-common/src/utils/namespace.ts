/**
 * @created: 2023/7/14
 * @author: Xuanmo
 * @desc: 创建命名空间，[namespace, BEM]
 */

import { PREFIX } from '../constants'

let prefix = PREFIX

export type Modifier = string | { [key: string]: unknown }
export type Modifiers = Modifier | Modifier[]

export const createPrefix = (p: string) => (prefix = p)

export const getComponentName = (name: string) => name?.replace(`${prefix}-`, '')

/**
 * 生成 BEM 修饰符
 * @param name
 * @param modifier
 */
export function generateModifier(name: Modifier, modifier?: Modifiers): string {
  if (!modifier) return ''

  if (typeof modifier === 'string') return ` ${name}--${modifier} `

  if (Array.isArray(modifier)) {
    return modifier.reduce<string>((prev, current) => prev + generateModifier(name, current), '')
  }

  return Object.keys(modifier).reduce(
    (prev, key) => prev + (modifier[key] ? generateModifier(name, key) : ''),
    ''
  )
}

/**
 * 生成 BEM
 * @param name 前缀
 */
export function createBEM(name: string) {
  return (el?: Modifiers | null, modifier?: Modifiers) => {
    if (el && typeof el !== 'string') {
      modifier = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${generateModifier(el, modifier)}`
  }
}

/**
 * 创建组件命名空间
 * @param name
 */
export function createNamespace(name: string) {
  const prefixName = `${prefix}-${name}`
  return [prefixName, createBEM(prefixName)] as const
}
