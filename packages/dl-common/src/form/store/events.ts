import EventEmitter from 'eventemitter3'
import { throwError } from '@xuanmo/utils'
import { formNamespace } from '../constants'
import { EventsType } from '../types'

type SuccessType = boolean

type FailType = { code: number; message: string }

type SuccessReturnType = SuccessType | Promise<SuccessType>

type FailReturnType = FailType | Promise<FailType>

type TaskType = (...args: unknown[]) => SuccessReturnType | FailReturnType

export class EventEmitterEx extends EventEmitter<EventsType> {
  private queueTask: Map<EventsType, Set<TaskType>> = new Map()

  /**
   * 可对支持被拦截的事件，进行拦截
   * @param eventName 事件名
   * @param task 任务
   */
  public proxy(eventName: EventsType, task: TaskType) {
    if (typeof task !== 'function') {
      throwError(formNamespace, 'The proxy must be a function.')
    }
    const tasks = this.queueTask.get(eventName)
    tasks ? tasks.add(task) : this.queueTask.set(eventName, new Set([task]))
    return this
  }

  /**
   * 取消拦截器
   * @param eventName
   * @param task
   */
  public removeProxy(eventName: EventsType, task: TaskType) {
    this.queueTask.get(eventName)?.delete(task)
    return this
  }

  /**
   * 执行事件
   * @param eventName 事件名
   * @param args 需要传递给拦截器的参数
   * @example
   * events.executeProxy('eventName', a, b, c)
   *   .then((value: SuccessType) => { console.log(value) })
   *   .catch((error: FailType) => { console.log(error) })
   */
  public executeProxy(eventName: EventsType, ...args: unknown[]) {
    return new Promise(
      async (resolve: (value: SuccessType) => void, reject: (reason: FailType) => void) => {
        const tasks = Array.from(this.queueTask.get(eventName) ?? [])
        if (tasks.length) {
          for (let i = 0; i < tasks.length; i++) {
            try {
              const taskResult = await tasks[i](...args)
              if (taskResult !== true) reject(taskResult as FailType)
            } catch (e) {
              reject(e as FailType)
            }
          }
        }
        resolve(true)
      }
    )
  }

  public destroy() {
    this.queueTask.clear()
    this.removeAllListeners()
  }
}
