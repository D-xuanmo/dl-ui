import { DLoading, LoadingProps } from '.'
import { mountComponent } from '../utils'
import { getCurrentInstance, ref, Teleport } from 'vue'
import { TeleportProps } from 'vue/dist/vue'

type LoadingInstance = {
  close: () => void
}

type LoadingOptions = Partial<Omit<LoadingProps, 'loading'>> & {
  to?: TeleportProps['to']
}

let globalInstance: LoadingInstance | null = null

const createInstance = (options?: LoadingOptions) => {
  const { instance, unmount } = mountComponent({
    setup() {
      const { to = 'body' } = options ?? {}
      const loading = ref(true)

      const close = () => {
        loading.value = false
        unmount()
      }

      ;(getCurrentInstance() as any).render = () => {
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

      return { close }
    }
  })

  return instance as unknown as LoadingInstance
}

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
