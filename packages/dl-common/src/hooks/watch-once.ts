import { nextTick, watch, WatchOptions } from 'vue'

export default function watchOnce<T>(
  source: T,
  callback: (args: T) => any,
  options?: WatchOptions
) {
  const stop = watch(
    () => source,
    (args: T) => {
      nextTick(() => stop())

      callback(args)
    },
    options
  )
}
