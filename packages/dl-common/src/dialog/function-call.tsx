import { DDialog, DialogProps } from './index'
import { mountComponent, getID } from '../utils'
import { reactive, ref } from 'vue'
import { useConfig } from '../hooks'

type DialogOptions = Partial<Omit<DialogProps, 'visible'>>

export type DialogInstance = {
  open: () => void
  close: () => void
  update: (options: Partial<Omit<DialogProps, 'visible'>>) => void
}

const dialogInstances: Map<string, DialogInstance> = new Map()

function createInstance(options: DialogOptions) {
  const { instance, unmount } = mountComponent({
    setup(_props, { expose }) {
      const visible = ref(false)
      const dialogProps = reactive(options)

      const open = () => {
        visible.value = true
      }

      const close = () => {
        visible.value = false
        unmount()
      }

      const update = (options: DialogOptions) => {
        Object.assign(dialogProps, options)
      }

      expose({ open, update, close })

      return () => {
        const props = {
          ...dialogProps,
          visible: visible.value,
          'onUpdate:visible': close
        }
        return <DDialog {...props} />
      }
    }
  })

  return instance as unknown as DialogInstance
}

function showDialog(props: DialogOptions) {
  const dialogInstance = createInstance(props)
  dialogInstance.open()
  dialogInstances.set(getID('dialog'), dialogInstance)
  return dialogInstance
}

/**
 * TODO 下个主版本去掉
 */
export const DialogPlugin = {
  confirm: (options: DialogOptions) => showDialog(options),
  alert: (options: DialogOptions) =>
    showDialog({
      ...options,
      hideCancelButton: true,
      closeOnEsc: false,
      closeOnOverlayClick: false
    })
}

export const useDialog = () => {
  const config = useConfig(['closeOnEsc'])
  return {
    confirm: (options: DialogOptions) =>
      showDialog({
        closeOnEsc: config.value.closeOnEsc,
        ...options
      }),
    alert: (options: DialogOptions) =>
      showDialog({
        ...options,
        hideCancelButton: true,
        closeOnEsc: false,
        closeOnOverlayClick: false
      })
  }
}
