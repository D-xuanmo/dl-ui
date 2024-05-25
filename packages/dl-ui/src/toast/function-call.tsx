import { reactive } from 'vue'
import DToast from './toast.vue'
import { ToastProps } from './props'
import { mountComponent, getID, useConfig } from '@xuanmo/dl-common'

export type ToastInstance = {
  update: (option: ToastOptions) => void
  open: () => void
  destroy: () => void
}

type ToastOptions = Partial<Omit<ToastProps, 'visible'>>

const toastInstances: Map<string, ToastInstance> = new Map()

const defaultProps: Partial<ToastProps> = {
  duration: 2000
}

function createInstance(option: ToastOptions, id: string) {
  const { instance, unmount } = mountComponent({
    setup(_, { expose }) {
      const state = reactive({
        show: false
      })

      const toastProps = reactive(option)

      const toggleVisible = (visible: boolean) => (state.show = visible)

      const update = (option: ToastOptions) => {
        Object.assign(toastProps, option)
      }

      const handleOpen = () => toggleVisible(true)

      const handleClose = () => {
        toggleVisible(false)
        setTimeout(() => {
          toastInstances.delete(id)
          unmount()
        }, defaultProps.duration ?? option.duration)
      }

      expose({
        update,
        open: handleOpen,
        destroy: handleClose
      })

      return () => {
        const attrs = {
          ...defaultProps,
          ...toastProps,
          visible: state.show,
          'transition-appear': true,
          'onUpdate:visible': handleClose
        }
        return <DToast {...attrs} />
      }
    }
  })

  return instance as unknown as ToastInstance
}

function showToast(props: string | ToastOptions) {
  let options: ToastOptions
  if (typeof props === 'string') {
    options = {
      content: props
    }
  } else {
    options = props
  }

  const id = getID('toast')
  const instance = createInstance(options, id)
  toastInstances.set(id, instance)
  instance.open()
  return instance
}

export const useToast = () => {
  const config = useConfig(['direction'])
  return {
    text: (content: string, option?: ToastOptions) =>
      showToast({
        content,
        direction: config.value.direction,
        ...option
      }),
    success: (content: string, option?: ToastOptions) =>
      showToast({
        content,
        theme: 'success',
        direction: config.value.direction,
        ...option
      }),
    error: (content: string, option?: ToastOptions) =>
      showToast({
        content,
        theme: 'error',
        direction: config.value.direction,
        ...option
      }),
    loading: (content: string, option?: ToastOptions) =>
      showToast({
        content,
        theme: 'loading',
        direction: config.value.direction,
        ...option
      }),
    destroyAll() {
      toastInstances.forEach((instance) => {
        instance.destroy()
      })
    }
  }
}
