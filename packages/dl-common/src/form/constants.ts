import { createNamespace } from '../utils'

const [formNamespace, createFormBEM] = createNamespace('form')

export { formNamespace, createFormBEM }

/**
 * 事件名前缀
 */
export enum EventPrefixEnum {
  /**
   * 字段事件
   */
  FIELD = 'field',

  /**
   * 联动事件
   */
  LINKAGE = 'linkage'
}
