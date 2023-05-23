import { getCurrentInstance, reactive } from 'vue'
import { mountComponent, PREFIX } from '@xuanmo/dl-common'
import { MessageProps } from './props'
import DMessage from './message.vue'

export type MessageInstance = {
  open: () => void
  destroy: () => void
}

let wrapperId: string | null = null

const messageInstances: Map<string, MessageInstance> = new Map()

const defaultProps: Partial<MessageProps> = {
  duration: 2000
}

function createInstance(props: Partial<Omit<MessageProps, 'visible'>>, id: string) {
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
            messageInstances.delete(id)
            unmount()
          }, (defaultProps.duration ?? props.duration)! + 10)
        }

        ;(getCurrentInstance() as any).render = () => {
          const attrs = {
            ...defaultProps,
            ...props,
            teleport: `#${wrapperId}`,
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

  if (!wrapperId) {
    const wrapperDOM = document.createElement('div')
    wrapperId = `${PREFIX}-message-container`
    wrapperDOM.setAttribute('id', wrapperId)

    if (!document.body.querySelector(`#${wrapperId}`)) {
      document.body.appendChild(wrapperDOM)
    }
  }

  const id = `${Date.now()}`
  const instance = createInstance(options, id)
  messageInstances.set(id, instance)
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
