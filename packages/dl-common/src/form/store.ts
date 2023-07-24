import { FormModels, IFormModelItem } from './types'
import { markRaw, reactive, UnwrapNestedRefs } from 'vue'
import { deepCopy, isEmpty, isObject } from '@xuanmo/utils'
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
        display: isEmpty(item.display) ? true : item.display,
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
    this.updateModel(this.getModelIdByDataKey(dataKey), { value })
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
   * @param id
   * @param item
   */
  public updateModel = (id: string, item: Partial<IFormModelItem>) => {
    const newItem = this.getItem(id)
    if (newItem) {
      Object.assign(newItem, item)
      this.models.set(this.getModelIdByDataKey(id), newItem)
    }
  }

  /**
   * 获取单个 item 信息
   * @param id
   */
  public getItem = (id: string) => this.models.get(this.dataKeyMap.get(id) || id)

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
   * 设置显示隐藏
   * @param id
   * @param display
   */
  public setDisplay = (id: string, display: boolean) => {
    this.updateModel(id, {
      display
    })
  }

  /**
   * 设置只读
   * @param id
   * @param readonly
   */
  public setReadonly = (id: string, readonly: boolean) => {
    this.updateModel(id, {
      readonly
    })
  }

  /**
   * 设置禁用
   * @param id
   * @param disabled
   */
  public setDisabled = (id: string, disabled: boolean) => {
    this.updateModel(id, {
      disabled
    })
  }

  /**
   * 设置必填
   * @param id
   * @param required
   */
  public setRequired = (id: string, required: boolean) => {
    this.updateModel(id, {
      required
    })
  }

  /**
   * 表单重置
   */
  public reset = () => {
    ;(this.originalModel as IFormModelItem[]).forEach((item) => {
      if (item.dataKey) {
        const model = this.getItem(item.dataKey)!
        Object.assign(model, { value: item.value })
        this.updateModel(item.dataKey, model)
      }
    })
    this.clearMessages()
  }

  /**
   * 表单校验
   */
  public validate = () =>
    new Promise((resolve, reject) => {
      const models = this.convertModel().filter((item) => {
        // 隐藏字段、禁用字段、只读字段不参与校验
        return item.display !== false && item.disabled !== true && item.readonly !== true
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

  /**
   * 单个校验
   * @param dataKey 数据键名
   */
  public singleValidate = (dataKey: string) => {
    const item = this.getItem(dataKey)
    if (item) {
      validator
        .validate([item])
        .then(() => {
          this.errorMessages[dataKey] = ''
        })
        .catch((error) => {
          this.errorMessages[dataKey] = error[dataKey]
        })
    }
  }

  /**
   * 获取单个字段的错误信息
   * @param dataKey 数据键名
   */
  public getSingleMessage = (dataKey: string) => this.errorMessages[dataKey]

  /**
   * 清空所有校验信息
   */
  public clearMessages = () => {
    Object.keys(this.errorMessages).forEach((key) => (this.errorMessages[key] = ''))
  }

  /**
   * 转换表单模型
   */
  public convertModel = () => Array.from(this.models.values())
}

export { FormStore }
