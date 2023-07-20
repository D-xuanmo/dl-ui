import { DDialog, DialogProps } from './index'
import { mountComponent } from '../utils'
import { getCurrentInstance, reactive, ref } from 'vue'

export type DialogInstance = {
  open: () => void
  close: () => void
}

const dialogInstances: Map<string, DialogInstance> = new Map()

function createInstance(options: Partial<Omit<DialogProps, 'visible'>>) {
  const { instance, unmount } = mountComponent({
    setup() {
      const visible = ref(false)
      const dialogProps = reactive(options)

      const open = () => {
        visible.value = true
      }

      const close = () => {
        visible.value = false
        unmount()
      }

      const update = (options: Omit<DialogProps, 'visible'>) => {
        Object.assign(dialogProps, options)
      }

      ;(getCurrentInstance() as any).render = () => {
        const props = {
          ...dialogProps,
          visible: visible.value,
          'onUpdate:visible': close
        }
        return <DDialog {...props} />
      }

      return {
        open,
        close,
        update
      }
    }
  })

  return instance as unknown as DialogInstance
}

function showDialog(props: Partial<Omit<DialogProps, 'visible'>>) {
  const id = `dialog@${Date.now()}`
  const dialogInstance = createInstance(props)
  dialogInstance.open()
  dialogInstances.set(id, dialogInstance)
  return dialogInstance
}

export const DialogPlugin = {
  confirm: (options: Partial<Omit<DialogProps, 'visible'>>) => showDialog(options),
  alert: (options: Omit<DialogProps, 'visible'>) =>
    showDialog({
      ...options,
      hideCancelButton: true,
      closeOnEsc: false,
      closeOnOverlayClick: false
    })
}
