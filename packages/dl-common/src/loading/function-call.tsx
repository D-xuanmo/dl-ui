import { DLoading, LoadingProps } from '.'
import { mountComponent } from '../utils'
import { ref, Teleport } from 'vue'
import { TeleportProps } from 'vue/dist/vue'

type LoadingInstance = {
  close: () => void
}

type LoadingOptions = Partial<Omit<LoadingProps, 'loading'>> & {
  to?: TeleportProps['to']
}

let globalInstance: LoadingInstance | null = null

const createInstance = (options?: LoadingOptions) => {
  const target = document.createElement('div')
  const { instance, unmount } = mountComponent(
    {
      inheritAttrs: false,
      setup(_, { expose }) {
        const { to = target } = options ?? {}
        const loading = ref(true)

        const close = () => {
          loading.value = false
          unmount()
        }

        expose({ close })

        return () => {
          const props = {
            ...options,
            loading: loading.value
          }
          return (
            <Teleport to={to}>
              <DLoading {...props} />
            </Teleport>
          )
        }
      }
    },
    target
  )

  return instance as unknown as LoadingInstance
}

/**
 * TODO 下个主版本去掉
 */
export const LoadingPlugin = {
  open(options?: LoadingOptions) {
    globalInstance?.close()
    return (globalInstance = createInstance({
      fullScreen: true,
      ...options
    }))
  },
  close: () => globalInstance?.close()
}

export const useLoading = () => {
  return {
    open(options?: LoadingOptions) {
      globalInstance?.close()
      return (globalInstance = createInstance({
        fullScreen: true,
        ...options
      }))
    },
    close: () => globalInstance?.close()
  }
}
