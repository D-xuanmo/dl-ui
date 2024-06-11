import { FormModels, IDetailTableItem, IFormModelItem } from '../types'
import { markRaw, reactive, ref, UnwrapNestedRefs } from 'vue'
import { deepCopy, isEmpty, isObject } from '@xuanmo/utils'
import { validator } from '../../validator'
import { EventEmitterEx } from './events'
import { ViewLinkageStore } from './view-linkage'
import { ViewLinkageType } from './view-linkage/types'
import { ValidateDataModel, ValidateDataModelItem } from '@xuanmo/validator'
import { DetailTableStore } from './detail-table'
import { DetailTableRowData } from './detail-table/types'
import { getMessageKey, isDetailTableField } from '../utils'
import { EventPrefixEnum } from '../constants'

class FormStore {
  /**
   * 表单数据模型
   */
  private models: UnwrapNestedRefs<Map<string, IFormModelItem>> = reactive(new Map())

  /**
   * dataKey 映射 id 对应关系
   * @private
   */
  private dataKeyMap: Map<string, string> = new Map()

  /**
   * 明细表 id 映射 id 对应关系
   * @private
   */
  private tableIdMap: Map<string, string> = new Map()

  /**
   * 表单原始数据
   */
  private originalModel: FormModels = []

  /**
   * 校验失败错误信息
   */
  private errorMessages: UnwrapNestedRefs<Record<string, string>> = reactive({})

  /**
   * 组件关系
   * key：id
   * value 子级集合
   */
  private compRelationship: Map<string, string[]> = reactive(new Map())

  /**
   * 表单数据
   * @private
   */
  private mainFormData = reactive<Record<string, any>>({})

  /**
   * 表单禁用
   */
  formDisabled = ref(false)

  /**
   * 表单只读
   */
  formReadonly = ref(false)

  /**
   * 事件中心
   */
  events = new EventEmitterEx()

  /**
   * 显示属性联动 store
   */
  viewLinkageStore = new ViewLinkageStore(this)

  /**
   * 明细表数据
   */
  detailTableStore = new DetailTableStore()

  /**
   * 表单初始化
   * @param options
   */
  public init(options: { models: FormModels; viewLinkage: ViewLinkageType }) {
    this.clear()
    const { models, viewLinkage } = options
    this.originalModel = deepCopy(models)
    ;(models as IFormModelItem[]).forEach((item) => {
      const parentComps = this.compRelationship.get(item.layout.parent)
      if (parentComps) {
        parentComps.push(item.id)
      } else {
        this.compRelationship.set(item.layout.parent, [item.id])
      }
      if (item.detailTableId && item.componentType === 'DetailTable') {
        this.tableIdMap.set(item.detailTableId, item.id)
      }
      this.models.set(item.id, {
        ...item,
        display: isEmpty(item.display) ? true : item.display,
        // 如果是一个 vue 组件，返回对象本身，不需要进行代理
        component: isObject(item.component) ? markRaw(item.component as object) : item.component
      })
      this.setDisplay(item.id, item.display ?? true)
      this.setRequired(
        item.id,
        item.required ?? (item as IFormModelItem).rules?.includes('required') ?? false
      )
      if (item.dataKey) {
        if (!isDetailTableField(item)) {
          Object.assign(this.mainFormData, { [item.dataKey]: item.value })
        }
        this.dataKeyMap.set(item.dataKey, item.id)
        this.setReadonly(item.id, item.readonly ?? false)
        this.setDisabled(item.id, item.disabled ?? false)
      }
    })
    this.viewLinkageStore.init(viewLinkage)
    this.events.emit(`${EventPrefixEnum.FORM}.ready`, this)
  }

  /**
   * 通过 dataKey 获取 model id
   * @param dataKey
   */
  public getModelIdByDataKey = (dataKey: string) => this.dataKeyMap.get(dataKey) || dataKey

  /**
   * 获取表单模型
   */
  public getFormModels = () => this.convertModel()

  /**
   * 更新单个字段数据
   * @param dataKey
   * @param value
   * @param rowId
   * @deprecated 主版本发布后废弃，改为 updateFieldValue
   */
  public updateSingleValue(dataKey: string, value: any, rowId?: string) {
    this.updateFieldValue(dataKey, value, rowId)
  }

  /**
   * 更新单个字段数据
   * @param dataKey
   * @param value
   * @param rowId
   */
  public updateFieldValue(dataKey: string, value: any, rowId?: string) {
    if (rowId) {
      const detailTableId = this.getDetailTableId(dataKey)
      this.detailTableStore.upsert(detailTableId, rowId, value, dataKey)
    } else {
      Object.assign(this.mainFormData, { [dataKey]: value })
      this.viewLinkageStore.execute(dataKey, value)
    }
  }

  /**
   * 更新多个字段数据，默认会执行校验
   * @param data
   * @param validate 是否执行校验
   */
  public updateData(data: Record<string, unknown>, validate = true) {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (this.tableIdMap.get(key)) {
          this.detailTableStore.updateTableData(key, value as DetailTableRowData[])
        } else {
          this.updateFieldValue(key, value)
        }
      }
      validate && this.validate()
    }
  }

  /**
   * 更新单个 item 信息
   * @param id
   * @param item
   */
  public updateModel(id: string, item: Partial<IFormModelItem>) {
    const newItem = this.getModel(id)
    if (newItem) {
      Object.assign(newItem, item)
      this.models.set(this.getModelIdByDataKey(id), newItem)
    }
  }

  /**
   * 获取单个 item 信息
   * @param id
   * @deprecated 主版本发布后废弃，改为 getModel
   */
  public getItem<T = IFormModelItem>(id: string) {
    return this.getModel(id) as T
  }

  /**
   * 获取单个 model 信息
   * @param id
   */
  public getModel<T = IFormModelItem>(id: string) {
    return this.models.get(this.dataKeyMap.get(id) || id) as T
  }

  /**
   * 获取明细表信息
   * @param tableId
   */
  public getModelByTableId(tableId: string) {
    return this.models.get(this.tableIdMap.get(tableId)!) as IDetailTableItem
  }

  /**
   * 获取子级集合
   * @param parentId 父级 id
   */
  public getChildren(parentId: string) {
    const children = this.compRelationship.get(parentId)
    if (children) return children.map((id) => this.getModel(id))
    return []
  }

  /**
   * 获取父级信息
   * @param id
   */
  public getParent<T>(id: string) {
    return this.getModel<T>(this.getModel(this.getModelIdByDataKey(id))?.layout.parent)
  }

  /**
   * 获取明细表 id
   * @param id
   */
  public getDetailTableId(id: string) {
    return this.getModel<IDetailTableItem>(id).detailTableId
  }

  /**
   * 获取单个字段 value
   * @param dataKey
   * @param rowId
   */
  public getFieldValue(dataKey: string, rowId?: string) {
    if (rowId) {
      const detailTableId = this.getDetailTableId(dataKey)
      return this.detailTableStore.getFieldValue(detailTableId, rowId, dataKey)
    }
    return this.mainFormData[dataKey]
  }

  /**
   * 获取单个字段 value
   * @param dataKey
   * @param rowId
   * @deprecated 主版本发布后去除，需要改为 getFieldValue
   */
  public getSingleValue(dataKey: string, rowId?: string) {
    return this.getFieldValue(dataKey, rowId)
  }

  /**
   * 获取表单数据
   */
  public getFormData() {
    return {
      ...this.mainFormData,
      ...this.detailTableStore.getTableDataConverted()
    }
  }

  /**
   * 设置显示隐藏
   * @param id
   * @param value
   */
  public setDisplay(id: string, value: boolean) {
    this.viewLinkageStore.setDisplay(id, value)
  }

  /**
   * 设置只读
   * @param id
   * @param value
   */
  public setReadonly(id: string, value: boolean) {
    this.viewLinkageStore.setReadonly(id, value)
  }

  /**
   * 设置禁用
   * @param id
   * @param value
   */
  public setDisabled(id: string, value: boolean) {
    this.viewLinkageStore.setDisabled(id, value)
  }

  /**
   * 设置必填
   * @param id
   * @param value
   */
  public setRequired(id: string, value: boolean) {
    this.viewLinkageStore.setRequired(id, value)
  }

  /**
   * 设置整表禁用
   * @param value
   */
  public setFormDisabled(value: boolean) {
    this.formDisabled.value = value
  }

  /**
   * 设置整表只读
   * @param value
   */
  public setFormReadonly(value: boolean) {
    this.formReadonly.value = value
  }

  /**
   * 表单重置
   */
  public reset() {
    ;(this.originalModel as IFormModelItem[]).forEach((item) => {
      if (item.dataKey) {
        this.updateFieldValue(item.dataKey, item.value)
      }
    })
    this.clearMessages()
  }

  /**
   * 表单校验
   */
  public validate() {
    return new Promise((resolve, reject) => {
      const models: ValidateDataModel = []
      this.convertModel().forEach((item) => {
        // 隐藏字段、禁用字段、只读字段不参与校验
        if (
          (!item.dataKey && item.componentType !== 'DetailTable') ||
          (item.detailTableId && item.componentType !== 'DetailTable') ||
          !this.viewLinkageStore.getDisplay(item.id) ||
          this.viewLinkageStore.getDisabled(item.id) ||
          this.viewLinkageStore.getReadonly(item.id)
        ) {
          return
        }
        const model: ValidateDataModelItem = {
          ...item,
          value: this.getFieldValue(item.dataKey),
          required: this.viewLinkageStore.getRequired(item.id)
        }
        if (item.componentType === 'DetailTable') {
          Object.assign(model, {
            matrix: item.componentType === 'DetailTable',
            matrixId: item.detailTableId,
            value: {
              columns: this.getChildren(item.id),
              data: Array.from(
                this.detailTableStore.getTableData(item.detailTableId!)?.values() ?? []
              )
            }
          })
        }
        models.push(model)
      })
      validator
        .validate(models)
        .then(() => {
          this.clearMessages()
          resolve(true)
        })
        .catch((error) => {
          this.clearMessages()
          Object.assign(this.errorMessages, error)
          reject(error)
        })
    })
  }

  /**
   * 单个校验
   * @param dataKey 数据键名
   * @param detailTableId
   * @param rowId
   */
  public singleValidate(dataKey: string, detailTableId?: string, rowId?: string) {
    const item = {
      ...this.getModel(dataKey),
      value: this.getFieldValue(dataKey),
      required: this.viewLinkageStore.getRequired(dataKey)
    }
    if (detailTableId) {
      Object.assign(item, {
        ...this.getModel(dataKey),
        value: this.getFieldValue(dataKey, rowId!)
      })
    }
    if (item) {
      validator
        .validate([item])
        .then(() => {
          this.errorMessages[getMessageKey(dataKey, detailTableId, rowId)] = ''
        })
        .catch((error) => {
          this.errorMessages[getMessageKey(dataKey, detailTableId, rowId)] = error[dataKey]
        })
    }
  }

  /**
   * 获取单个字段的错误信息
   * @param dataKey 数据键名
   * @param detailTableId 明细表 id
   * @param rowId 明细表行数据 id
   */
  public getSingleMessage(dataKey: string, detailTableId?: string, rowId?: string) {
    return this.errorMessages[getMessageKey(dataKey, detailTableId, rowId)]
  }

  /**
   * 清空所有校验信息
   */
  public clearMessages() {
    Object.keys(this.errorMessages).forEach((key) => (this.errorMessages[key] = ''))
  }

  /**
   * 转换表单模型
   */
  public convertModel = () => Array.from(this.models.values())

  /**
   * 清理 store 相关数据
   */
  private clear() {
    this.models.clear()
    this.compRelationship.clear()
    this.dataKeyMap = new Map()
    this.tableIdMap = new Map()
    this.originalModel = []
    this.errorMessages = reactive({})
    this.mainFormData = reactive({})
    this.viewLinkageStore = new ViewLinkageStore(this)
  }
}

export { FormStore }
export * from './view-linkage/types'
export * from './detail-table/types'
