import { nextTick, watch } from 'vue'
import { WatchOptions } from '@vue/runtime-core'

export function watchOnce<T>(source: T, callback: (args: T) => any, options?: WatchOptions) {
  const stop = watch(
    () => source,
    (args: T) => {
      nextTick(() => stop())

      callback(args)
    },
    options
  )
}
