import { ConditionEnum, ConditionTypeEnum, ExecutePropEnum, ExecuteSymbolEnum } from './constants'
import { EventPrefixEnum } from '../../constants'

export type ConditionDetailRelationshipVariableType = {
  /**
   * 条件类型
   */
  type: `${ConditionTypeEnum.VARIABLE}`

  /**
   * 变量字段，对应 IFormModelItem.dataKey
   */
  variableId: string
}

export type ConditionDetailRelationshipConstantType = {
  /**
   * 条件类型
   */
  type: `${ConditionTypeEnum.CONSTANT}`

  /**
   * 运算常量
   */
  constants: unknown
}

type ConditionDetailRelationshipType =
  | ConditionDetailRelationshipVariableType
  | ConditionDetailRelationshipConstantType

export type ConditionDetailNotNullType<T = ConditionDetailRelationshipType> = T & {
  /**
   * 触发字段 id，对应 IFormModelItem.dataKey
   */
  triggerId: string

  /**
   * 运算符
   */
  symbol: `${Exclude<ExecuteSymbolEnum, 'NULL' | 'NOT_NULL'>}`
}

export type ConditionDetailNullType<T = ConditionDetailRelationshipType> = T & {
  /**
   * 触发字段 id，对应 IFormModelItem.dataKey
   */
  triggerId: string

  /**
   * 运算符
   */
  symbol: `${ExecuteSymbolEnum.NULL}` | `${ExecuteSymbolEnum.NOT_NULL}`
}

export type ConditionItemType = {
  /**
   * 满足条件
   */
  condition: `${ConditionEnum}`

  /**
   * 条件明细
   */
  details: Array<ConditionDetailNotNullType | ConditionDetailNullType>
}

export type LinkageItemType = {
  /**
   * 运算符
   */
  propKey: `${ExecutePropEnum}`

  /**
   * 需要执行的 id，对应 IFormModelItem.dataKey
   */
  targetId: string
}

export type ViewLinkageItemType = {
  /**
   * 条件列表
   */
  conditionList: ConditionItemType[]

  /**
   * 联动列表
   */
  linkageList: LinkageItemType[]
}

export type ViewLinkageType = ViewLinkageItemType[]

export type ViewLinkageEventsType =
  | `${EventPrefixEnum.LINKAGE}.beforeExecute`
  | `${EventPrefixEnum.LINKAGE}.afterExecute`
