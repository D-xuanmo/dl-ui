import { FormModel, IFormModelItem } from './types'
import { reactive } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { deepCopy } from '@xuanmo/javascript-utils'
import validate from '@xuanmo/validator'
import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validate.localize(zhCN)

class FormStore {
  /**
   * 表单数据模型
   */
  public model: UnwrapNestedRefs<Map<string, IFormModelItem>> = reactive(new Map())

  /**
   * 表单原始数据
   */
  private originalModel: FormModel = []

  /**
   * 校验失败错误信息
   */
  errorMessages: UnwrapNestedRefs<Record<string, string>> = reactive({})

  constructor(options: { model: FormModel }) {
    const { model } = options
    model.forEach((item) => {
      this.model.set(item.name, item)
    })
    this.originalModel = deepCopy(model)
  }

  /**
   * 更新数据
   * @param data
   */
  updateData = (data: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(data)) {
      const model = this.model.get(key)!
      Object.assign(model, { value })
      this.model.set(key, model)
    }
    this.validate()
  }

  /**
   * 获取单个 item 信息
   * @param name 字段名
   */
  getItem = (name: string) => this.model.get(name)

  /**
   *
   * @returns 获取表单数据
   */
  getFormData = () => {
    return Array.from(this.model.values()).reduce(
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
  reset = () => {
    this.originalModel.forEach((item) => {
      const model = this.model.get(item.name)!
      Object.assign(model, { value: item.value })
      this.model.set(item.name, model)
    })
  }

  /**
   * 表单校验
   */
  validate = () =>
    new Promise((resolve, reject) => {
      validate
        .validate(this.convertModel())
        .then(() => {
          this.clearMessages()
          resolve(true)
        })
        .catch((error) => {
          Object.assign(this.errorMessages, error)
          reject(error)
        })
    })

  /**
   * 单个校验
   * @param name 字段名
   */
  singleValidate = (name: string) => {
    const item = this.getItem(name)
    if (item) {
      validate
        .validate([item])
        .then(() => {
          this.errorMessages[name] = ''
        })
        .catch((error) => {
          this.errorMessages[name] = error[name]
        })
    }
  }

  private clearMessages = () => {
    Object.keys(this.errorMessages).forEach((key) => (this.errorMessages[key] = ''))
  }

  convertModel = () => Array.from(this.model.values())
}

export { FormStore }
