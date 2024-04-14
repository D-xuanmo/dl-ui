import { reactive, UnwrapNestedRefs } from 'vue'
import { IRenderModel } from '../../types'
import {
  ConditionDetailNotNullType,
  ConditionDetailRelationshipConstantType,
  ConditionDetailRelationshipVariableType,
  FormStore,
  LinkageItemType
} from '../index'
import { ViewLinkageType } from './types'
import { isEmpty, isObject } from '@xuanmo/utils'
import { ConditionEnum, ConditionTypeEnum, ExecutePropEnum, ExecuteSymbolEnum } from './constants'
import { IData } from '../../../common'
import { EventPrefixEnum } from '../../constants'

/**
 * 显示属性联动
 */
export class ViewLinkage {
  // 显示集合
  private displayMap: UnwrapNestedRefs<Map<IRenderModel['id'], boolean>> = reactive(new Map())

  // 只读集合
  private readonlyMap: UnwrapNestedRefs<Map<IRenderModel['id'], boolean>> = reactive(new Map())

  // 只读集合
  private disabledMap: UnwrapNestedRefs<Map<IRenderModel['id'], boolean>> = reactive(new Map())

  // 必填集合
  private requiredMap: UnwrapNestedRefs<Map<IRenderModel['id'], boolean>> = reactive(new Map())

  private formStore: FormStore

  // 所有需要执行联动的 id 列表
  private triggerIdList: string[] = []

  private linageList: ViewLinkageType = []

  constructor(formStore: FormStore) {
    this.formStore = formStore
  }

  init(linageList: ViewLinkageType) {
    if (isEmpty(linageList)) return
    this.linageList = linageList
    linageList.forEach((linkage) => {
      linkage.conditionList.forEach((item) => {
        item.details.forEach((detail) => {
          this.triggerIdList.push(detail.triggerId)
        })
      })
    })
  }

  /**
   * 执行联动
   * @param dataKey
   * @param value
   */
  execute(dataKey: string, value: unknown) {
    if (!this.triggerIdList.includes(dataKey)) return
    const loopFnKey = {
      [ConditionEnum.ANY]: 'some',
      [ConditionEnum.ALL]: 'every'
    } as const
    this.linageList.forEach((linageItem) => {
      linageItem.conditionList.forEach((conditionItem) => {
        const result = conditionItem.details[loopFnKey[conditionItem.condition]]((detailItem) => {
          const compareValue =
            detailItem.triggerId === dataKey
              ? value
              : this.formStore.getSingleValue(detailItem.triggerId)
          const constantItem =
            ConditionTypeEnum.CONSTANT &&
            (detailItem as ConditionDetailNotNullType<ConditionDetailRelationshipConstantType>)
          const variableItem =
            ConditionTypeEnum.VARIABLE &&
            (detailItem as ConditionDetailNotNullType<ConditionDetailRelationshipVariableType>)
          const sourceValue =
            detailItem.type === ConditionTypeEnum.CONSTANT
              ? constantItem.constants
              : this.formStore.getSingleValue(variableItem.variableId)
          return this.compare(detailItem, sourceValue, compareValue)
        })
        return this.trigger(linageItem.linkageList, result)
      })
    })
    this.formStore.events.emit(`${EventPrefixEnum.LINKAGE}.afterExecute`, true)
  }

  setDisplay(id: IRenderModel['id'], value: boolean) {
    this.displayMap.set(id, value)
  }

  setReadonly(id: IRenderModel['id'], value: boolean) {
    this.readonlyMap.set(id, value)
  }

  setDisabled(id: IRenderModel['id'], value: boolean) {
    this.disabledMap.set(id, value)
  }

  setRequired(id: IRenderModel['id'], value: boolean) {
    this.requiredMap.set(id, value)
  }

  getRequired(id: IRenderModel['id']) {
    return this.requiredMap.get(id)
  }

  getDisplay(id: IRenderModel['id']) {
    return this.displayMap.get(id)
  }

  getReadonly(id: IRenderModel['id']) {
    return this.formStore.formReadonly.value || this.readonlyMap.get(id)
  }

  getDisabled = (id: IRenderModel['id']) => {
    return this.formStore.formDisabled.value || this.disabledMap.get(id)
  }

  private compare(
    detailItem: ConditionDetailNotNullType,
    sourceValue: unknown,
    compareValue: unknown
  ) {
    switch (detailItem.symbol) {
      case ExecuteSymbolEnum.EQUAL:
        return this.equal(sourceValue, compareValue)
      case ExecuteSymbolEnum.NOT_EQUAL:
        return !this.equal(sourceValue, compareValue)
      case ExecuteSymbolEnum.NULL:
        return isEmpty(compareValue)
      case ExecuteSymbolEnum.NOT_NULL:
        return !isEmpty(compareValue)
      case ExecuteSymbolEnum.IN:
        return this.compareIn(compareValue, sourceValue)
      case ExecuteSymbolEnum.NOT_IN:
        return !this.compareIn(compareValue, sourceValue)
    }
  }

  private trigger(list: LinkageItemType[], value: boolean) {
    list.forEach((item) => {
      switch (item.propKey) {
        case ExecutePropEnum.REQUIRED:
          this.setRequired(item.targetId, value)
          break
        case ExecutePropEnum.DISABLED:
          this.setDisabled(item.targetId, value)
          break
        case ExecutePropEnum.HIDE:
          this.setDisplay(item.targetId, !value)
          break
        case ExecutePropEnum.READONLY:
          this.setReadonly(item.targetId, value)
          break
        case ExecutePropEnum.DISPLAY:
          this.setDisplay(item.targetId, value)
          break
        case ExecutePropEnum.EDIT:
          this.setDisabled(item.targetId, !value)
          this.setReadonly(item.targetId, !value)
          break
      }
    })
  }

  private compareIn(source: unknown, target: unknown) {
    if (isEmpty(target)) return false
    if (Array.isArray(source) && Array.isArray(target)) {
      return source.some((item) => {
        // 内置数据结构，对象数组比较
        if (
          isObject(item) &&
          (target as IData[]).findIndex((newItem) => newItem.value === item.value) > -1
        ) {
          return true
        }
        return (target as unknown[]).includes(item)
      })
    }
    if (isObject(source)) {
      return Object.keys(source as Record<string, unknown>).every((key) => {
        return (source as Record<string, unknown>)[key] === (target as Record<string, unknown>)[key]
      })
    }
    return `${source}`.includes(`${target}`)
  }

  private equal(diff1: unknown, diff2: unknown) {
    if (Array.isArray(diff1)) {
      return diff1.every((item) => {
        // 内置数据结构，对象数组比较
        if (
          isObject(item) &&
          (diff2 as IData[]).findIndex((newItem) => newItem.value === item.value) > -1
        ) {
          return true
        }
        return (diff2 as unknown[]).includes(item)
      })
    }
    if (isObject(diff1)) {
      return Object.keys(diff1 as Record<string, unknown>).every((key) => {
        return (diff1 as Record<string, unknown>)[key] === (diff2 as Record<string, unknown>)[key]
      })
    }
    return diff1 === diff2
  }
}
