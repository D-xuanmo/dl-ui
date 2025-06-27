import { FormModels, IDetailTableItem, IFormModelItem, IRenderModel } from '../types'
import { markRaw, reactive, ref, UnwrapNestedRefs } from 'vue'
import { createRandomID, deepCopy, isEmpty, isObject } from '@xuanmo/utils'
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
  public formDisabled = ref(false)

  /**
   * 表单只读
   */
  public formReadonly = ref(false)

  /**
   * 事件中心
   */
  public events = new EventEmitterEx()

  /**
   * 显示属性联动 store
   */
  public viewLinkageStore = new ViewLinkageStore(this)

  /**
   * 明细表数据
   */
  public detailTableStore = new DetailTableStore(this)

  /**
   * id 生成器
   */
  public idGenerator: () => string = createRandomID

  /**
   * 初始化表单
   * @param options - 初始化选项
   * @param options.models - 表单模型
   * @param options.viewLinkage - 视图联动类型
   */
  public init(options: { models: FormModels; viewLinkage?: ViewLinkageType }) {
    this.updateModels(options)

    // 触发表单初始化完成事件
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
   * 更新表单模型
   * @param id - 组件 ID
   * @param item - 组件模型
   */
  public updateModel(id: string, item: Partial<IFormModelItem>) {
    const newItem = this.getModel(id)

    if (newItem) {
      Object.assign(newItem, item)

      // 根据数据键获取模型 ID，并将更新后的模型添加到 models Map 中
      this.models.set(this.getModelIdByDataKey(id), newItem)
    }
  }

  /**
   * 更新表单模型
   * @param options - 初始化选项
   * @param options.models - 表单模型
   * @param options.viewLinkage - 视图联动类型
   */
  public updateModels(options: { models: FormModels; viewLinkage?: ViewLinkageType }) {
    this.clear()

    const { models, viewLinkage } = options

    // 复制模型
    this.originalModel = deepCopy(models)
    ;(models as IFormModelItem[]).forEach((item) => {
      // 处理父子级关系
      const parentComps = this.compRelationship.get(item.layout.parent)
      if (parentComps) {
        parentComps.push(item.id)
      } else {
        this.compRelationship.set(item.layout.parent, [item.id])
      }

      // 处理明细表映射关系
      if (item.detailTableId && item.componentType === 'DetailTable') {
        this.tableIdMap.set(item.detailTableId, item.id)
      }

      this.models.set(item.id, {
        ...item,
        display: isEmpty(item.display) ? true : item.display,
        component: isObject(item.component) ? markRaw(item.component as object) : item.component
      })

      // 设置显示状态
      this.setDisplay(item.id, item.display ?? true)

      // 设置必填状态
      this.setRequired(
        item.id,
        item.required ?? (item as IFormModelItem).rules?.includes('required') ?? false
      )

      // 处理数据键映射关系
      if (item.dataKey) {
        if (!isDetailTableField(item)) {
          Object.assign(this.mainFormData, { [item.dataKey]: item.value })
        }
        this.dataKeyMap.set(item.dataKey, item.id)
        this.setReadonly(item.id, item.readonly ?? false)
        this.setDisabled(item.id, item.disabled ?? false)
      }
    })

    // 初始化视图联动
    this.viewLinkageStore.init(viewLinkage || [])
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
   * @param tableId 明细表 id
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
  public getParent<T extends IRenderModel>(id: string) {
    return this.getModel<T>(this.getModel(this.getModelIdByDataKey(id))?.layout.parent)
  }

  /**
   * 获取父级集合
   * @param id
   */
  public getParents(id: string) {
    const parents: IRenderModel[] = []
    let parent = this.getParent<IRenderModel>(id)
    while (parent) {
      parents.push(parent)
      parent = this.getParent<IRenderModel>(parent.id)
    }
    return parents
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
    const model = this.getModel(this.getModelIdByDataKey(dataKey))
    if (rowId) {
      const detailTableId = this.getDetailTableId(dataKey)
      return this.detailTableStore.getFieldValue(detailTableId, rowId, dataKey)
    }
    if (model && model.isVirtualKey && model.valueItems) {
      const data = model.valueItems.reduce((prev: Record<string, any>, current: string) => {
        if (this.mainFormData[current] === undefined) return prev
        prev[current] = this.mainFormData[current]
        return prev
      }, {})
      return isEmpty(data) ? undefined : data
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
    return new Promise<string>((resolve, reject) => {
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
            resolve('')
          })
          .catch((error) => {
            this.errorMessages[getMessageKey(dataKey, detailTableId, rowId)] = error[dataKey]
            reject(error[dataKey])
          })
      }
      resolve('')
    })
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
