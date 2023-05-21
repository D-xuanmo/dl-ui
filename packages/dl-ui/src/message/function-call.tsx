import { getCurrentInstance, reactive } from 'vue'
import { mountComponent } from '@xuanmo/dl-common'
import { MessageProps } from './props'
import DMessage from './message.vue'

export type MessageInstance = {
  open: () => void
  destroy: () => void
}

const messageInstances: MessageInstance[] = []

const defaultProps: Partial<MessageProps> = {
  duration: 2000
}

function createInstance(props: Partial<Omit<MessageProps, 'visible'>>) {
  const { instance, unmount } = mountComponent(
    {
      setup() {
        const state = reactive({
          show: false
        })

        const toggleVisible = (visible: boolean) => (state.show = visible)

        const handleOpen = () => toggleVisible(true)

        const handleClose = () => {
          toggleVisible(false)
          setTimeout(() => {
            unmount()
          }, defaultProps.duration ?? props.duration)
        }

        ;(getCurrentInstance() as any).render = () => {
          const attrs = {
            ...defaultProps,
            ...props,
            visible: state.show,
            'transition-appear': true,
            'onUpdate:visible': handleClose
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return <DMessage {...attrs} />
        }

        return {
          open: handleOpen,
          destroy: handleClose
        }
      }
    },
    false
  )

  return instance as unknown as MessageInstance
}

export function showMessage(props: string | Partial<Omit<MessageProps, 'visible'>>) {
  let options: Partial<Omit<MessageProps, 'visible'>>
  if (typeof props === 'string') {
    options = {
      content: props
    }
  } else {
    options = props
  }
  const instance = createInstance(options)
  messageInstances.push(instance)
  instance.open()
  return instance
}

export function showSuccessMessage(
  content: string,
  props?: Partial<Omit<MessageProps, 'visible'>>
) {
  return showMessage({
    content,
    theme: 'success',
    ...props
  })
}

export function showWarningMessage(
  content: string,
  props?: Partial<Omit<MessageProps, 'visible'>>
) {
  return showMessage({
    content,
    theme: 'warning',
    ...props
  })
}

export function showFailMessage(content: string, props?: Partial<Omit<MessageProps, 'visible'>>) {
  return showMessage({
    content,
    theme: 'error',
    ...props
  })
}

/**
 * 关闭页面所有消息提示
 */
export function closeAllMessage() {
  messageInstances.forEach((instance) => {
    instance.destroy
  })
}
