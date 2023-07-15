import { FormModels, IFormModelItem } from './types'
import { markRaw, reactive, UnwrapNestedRefs } from 'vue'
import { deepCopy, isObject } from '@xuanmo/utils'
import { validator } from '../validator'

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
   * 表单原始数据
   */
  private originalModel: FormModels = []

  /**
   * 校验失败错误信息
   */
  private errorMessages: UnwrapNestedRefs<Record<string, string>> = reactive({})

  /**
   * 表单初始化
   * @param options
   */
  init = (options: { models: FormModels }) => {
    const { models } = options
    this.originalModel = deepCopy(models)
    ;(models as IFormModelItem[]).forEach((item) => {
      if (item.dataKey) this.dataKeyMap.set(item.dataKey, item.id)
      this.models.set(item.id, {
        ...item,
        // 如果是一个 vue 组件，返回对象本身，不需要进行代理
        component: isObject(item.component) ? markRaw(item.component as object) : item.component
      })
    })
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
   */
  public updateSingleValue = (dataKey: string, value: any) => {
    this.updateItem(this.getModelIdByDataKey(dataKey), { value })
  }

  /**
   * 更新多个字段数据，默认会执行校验
   * @param data
   * @param validate 是否执行校验
   */
  public updateData = (data: Record<string, unknown>, validate = true) => {
    for (const [key, value] of Object.entries(data)) {
      this.updateSingleValue(key, value)
    }
    validate && this.validate()
  }

  /**
   * 更新单个 item 信息
   * @param key
   * @param item
   */
  public updateItem = (key: string, item: Partial<IFormModelItem>) => {
    const newItem = this.getItem(key)
    if (newItem) {
      Object.assign(newItem, item)
      this.models.set(this.getModelIdByDataKey(key), newItem)
    }
  }

  /**
   * 获取单个 item 信息
   * @param id
   */
  public getItem = (id: string) => this.models.get(this.getModelIdByDataKey(id))

  /**
   * 获取单个字段 value
   * @param dataKey
   */
  public getSingleValue = (dataKey: string) => {
    return this.getItem(this.getModelIdByDataKey(dataKey))?.value
  }

  /**
   *
   * @returns 获取表单数据
   */
  public getFormData = () => {
    return Array.from(this.models.values()).reduce((prev, current) => {
      if (current.dataKey) {
        return {
          ...prev,
          [current.dataKey]: current.value
        }
      }
      return prev
    }, {})
  }

  /**
   * 表单重置
   */
  public reset = () => {
    ;(this.originalModel as IFormModelItem[]).forEach((item) => {
      if (item.dataKey) {
        const model = this.getItem(item.dataKey)!
        Object.assign(model, { value: item.value })
        this.updateItem(item.dataKey, model)
      }
    })
  }

  /**
   * 表单校验
   */
  public validate = () =>
    new Promise((resolve, reject) => {
      validator
        .validate(this.convertModel())
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

  /**
   * 单个校验
   * @param name 字段名
   */
  public singleValidate = (name: string) => {
    const item = this.getItem(name)
    if (item) {
      validator
        .validate([item])
        .then(() => {
          this.errorMessages[name] = ''
        })
        .catch((error) => {
          this.errorMessages[name] = error[name]
        })
    }
  }

  /**
   * 获取单个字段的错误信息
   * @param key
   */
  public getSingleMessage = (key: string) => this.errorMessages[key]

  /**
   * 清空所有校验信息
   */
  private clearMessages = () => {
    Object.keys(this.errorMessages).forEach((key) => (this.errorMessages[key] = ''))
  }

  /**
   * 转换表单模型
   */
  private convertModel = () => Array.from(this.models.values())
}

export { FormStore }
