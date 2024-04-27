import { getCurrentInstance, reactive } from 'vue'
import DToast from './toast.vue'
import { ToastProps } from './props'
import { mountComponent } from '@xuanmo/dl-common'

export type ToastInstance = {
  update: (option: ToastOption) => void
  open: () => void
  destroy: () => void
}

type ToastOption = Partial<Pick<ToastProps, 'duration'>>

const toastInstances: Map<string, ToastInstance> = new Map()

const defaultProps: Partial<ToastProps> = {
  duration: 2000
}

function createInstance(option: ToastOption, id: string) {
  const { instance, unmount } = mountComponent({
    setup() {
      const state = reactive({
        show: false
      })

      const toastProps = reactive(option)

      const toggleVisible = (visible: boolean) => (state.show = visible)

      const update = (option: ToastOption) => {
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

      ;(getCurrentInstance() as any).render = () => {
        const attrs = {
          ...defaultProps,
          ...toastProps,
          visible: state.show,
          'transition-appear': true,
          'onUpdate:visible': handleClose
        }
        return <DToast {...attrs} />
      }

      return {
        update,
        open: handleOpen,
        destroy: handleClose
      }
    }
  })

  return instance as unknown as ToastInstance
}

function showMessage(props: string | Partial<Omit<ToastProps, 'visible'>>) {
  let options: Partial<Omit<ToastProps, 'visible'>>
  if (typeof props === 'string') {
    options = {
      content: props
    }
  } else {
    options = props
  }

  const id = `toast@${Date.now()}`
  const instance = createInstance(options, id)
  toastInstances.set(id, instance)
  instance.open()
  return instance
}

export const ToastPlugin = {
  text: (content: string, option?: ToastOption) =>
    showMessage({
      content,
      ...option
    }),
  success: (content: string, option?: ToastOption) =>
    showMessage({
      content,
      theme: 'success',
      ...option
    }),
  error: (content: string, option?: ToastOption) =>
    showMessage({
      content,
      theme: 'error',
      ...option
    }),
  loading: (content: string, option?: ToastOption) =>
    showMessage({
      content,
      theme: 'loading',
      ...option
    }),
  destroyAll() {
    toastInstances.forEach((instance) => {
      instance.destroy()
    })
  }
}
