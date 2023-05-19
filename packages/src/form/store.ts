import { FormModel, IFormModelItem, FormGroups, FormGroupItem } from './types'
import { markRaw, reactive, UnwrapNestedRefs } from 'vue'
import { deepCopy, isObject } from '@xuanmo/javascript-utils'
import { validator } from '../validator'

export type FormStoreInitialConfig = ConstructorParameters<typeof FormStore>[number]

class FormStore {
  /**
   * 表单数据模型
   */
  public models: UnwrapNestedRefs<Map<string, IFormModelItem>> = reactive(new Map())

  /**
   * 表单原始数据
   */
  private originalModel: FormModel = []

  /**
   * 分组信息
   */
  public groups: UnwrapNestedRefs<Map<string, FormGroupItem & { items: string[] }>> = reactive(
    new Map()
  )

  /**
   * 是否为分组模式
   */
  isGroupMode = false

  /**
   * 校验失败错误信息
   */
  errorMessages: UnwrapNestedRefs<Record<string, string>> = reactive({})

  constructor(options: { models: FormModel; groups?: FormGroups }) {
    const { models, groups } = options
    this.originalModel = deepCopy(models)
    models.forEach((item) => {
      this.models.set(item.name, {
        ...item,
        // 如果是一个 vue 组件，返回对象本身，不需要进行代理
        component: isObject(item.component) ? markRaw(item.component as object) : item.component
      })
    })
    if (groups) {
      this.isGroupMode = true
      this.resolveGroups(groups, models)
    }
  }

  /**
   * 解析分组信息
   * @param groups 分组列表
   * @param models 表单数据模型
   */
  private resolveGroups = (groups: FormGroups, models: FormModel) => {
    groups.forEach((group) => {
      this.groups.set(group.id, {
        ...group,
        items: models.filter((model) => model.groupId === group.id).map((model) => model.name)
      })
    })
  }

  /**
   * 更新数据
   * @param data
   */
  public updateData = (data: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(data)) {
      this.updateItem(key, { value })
    }
    this.validate()
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
      this.models.set(key, newItem)
    }
  }

  /**
   * 获取单个 item 信息
   * @param name 字段名
   */
  public getItem = (name: string) => this.models.get(name)

  /**
   *
   * @returns 获取表单数据
   */
  public getFormData = () => {
    return Array.from(this.models.values()).reduce(
      (prev, current) => ({
        ...prev,
        [current.name]: current.value
      }),
      {}
    )
  }

  /**
   * 表单重置
   */
  public reset = () => {
    this.originalModel.forEach((item) => {
      const model = this.models.get(item.name)!
      Object.assign(model, { value: item.value })
      this.models.set(item.name, model)
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
   * 清空所有校验信息
   */
  private clearMessages = () => {
    Object.keys(this.errorMessages).forEach((key) => (this.errorMessages[key] = ''))
  }

  public convertModel = () => Array.from(this.models.values())
}

export { FormStore }
