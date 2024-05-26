import { useForm } from './use-form'
import { IFormModelItem, IRenderModel } from '../types'
import { EventPrefixEnum } from '../constants'

/**
 * @param eventName 事件名
 * @param value 当前组件数据
 * @param rowId 明细表行 id
 */
type EmitType<T = unknown> = (eventName: string, value?: T, rowId?: string) => void

/**
 * 表单事件触发方法
 * @param model 当前组件配置模型
 */
export const useFormEventEmit = <T = unknown>(
  model: IFormModelItem | IRenderModel
): EmitType<T> | undefined => {
  try {
    const { store } = useForm()
    const id = (model as IFormModelItem).dataKey || model.id
    return (eventName, value, rowId) => {
      store.events.emit(`${EventPrefixEnum.FIELD}.${id}.${eventName}`, value, rowId)
    }
  } catch {
    return undefined
  }
}
