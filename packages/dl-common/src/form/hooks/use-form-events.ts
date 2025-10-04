import { useForm } from './use-form'
import { EventsType, IFormModelItem, IRenderModel } from '../types'
import { EventPrefixEnum } from '../constants'
import { onUnmounted } from 'vue'

/**
 * 定义一个用于触发事件的函数类型。
 * @param eventName - 事件名称
 * @param value - 事件的值
 * @param rowId - 行 ID（可选）
 * @typeparam T - 事件回调函数的参数类型，默认为 unknown
 */
type EmitType<T = unknown> = (eventName: string, value?: T, rowId?: string) => void

/**
 * 根据给定的模型对象注册事件监听器，并返回一个用于触发事件的函数。
 * @param model - 表单模型对象或渲染模型对象
 * @returns 一个函数，用于触发事件；如果发生异常，则返回 undefined
 * @template T - 事件回调函数的参数类型，默认为 unknown
 */
const emit = <T = unknown>(model: IFormModelItem | IRenderModel): EmitType<T> | undefined => {
  try {
    const { store } = useForm()
    const id = (model as IFormModelItem).dataKey || model.id

    /**
     * 触发事件的函数。
     * @param eventName - 事件名称
     * @param value - 事件的值
     * @param rowId - 行 ID（可选）
     */
    return (eventName, value, rowId) => {
      store.events.emit(`${EventPrefixEnum.FIELD}.${id}.${eventName}`, value, rowId)
      if (rowId) store.events.emit(`${EventPrefixEnum.FIELD}.${id}.${eventName}.${rowId}`, value)
    }
  } catch {
    return undefined
  }
}

/**
 * 注册事件监听器，并在组件卸载时自动取消注册。
 * @param eventName - 事件名称
 * @param callback - 事件回调函数
 */
const on = (eventName: EventsType, callback: (...params: any) => void) => {
  const { store } = useForm()

  // 注册事件的函数
  store.events.on(eventName, callback)

  // 在组件卸载时取消注册事件
  onUnmounted(() => {
    store.events.off(eventName, callback)
  })
}

/**
 * 定义一个 useFormEvent 函数，用于创建表单事件对象。
 * @param model - 表单模型对象或渲染模型对象
 * @returns 表单事件对象，包含 emit 和 on 方法
 * @template T - 事件回调函数的参数类型，默认为 unknown
 */
export const useFormEvent = <T = unknown>(model: IFormModelItem | IRenderModel) => {
  return {
    on,
    emit: emit<T>(model)
  }
}
