import { reactive } from 'vue'
import { PREFIX } from '../constants'
import { mountComponent, getID } from '../utils'
import { MessageProps } from './props'
import DMessage from './message.vue'

type MessageOptions = Partial<Pick<MessageProps, 'duration' | 'closable'>>

export type MessageInstance = {
  open: () => void
  destroy: () => void
}

let wrapperId: string | null = null

const messageInstances: Map<string, MessageInstance> = new Map()

const defaultProps: Partial<MessageProps> = {
  duration: 2000
}

function createInstance(option: MessageOptions, id: string) {
  const { instance, unmount } = mountComponent({
    setup(_, { expose }) {
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
        }, defaultProps.duration ?? option.duration)
      }

      expose({ open: handleOpen, destroy: handleClose })

      return () => {
        const attrs = {
          ...defaultProps,
          ...option,
          teleport: `#${wrapperId}`,
          visible: state.show,
          'transition-appear': true,
          'onUpdate:visible': handleClose
        }
        return <DMessage {...attrs} />
      }
    }
  })

  return instance as unknown as MessageInstance
}

function showMessage(props: string | Partial<Omit<MessageProps, 'visible'>>) {
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

  const id = getID('message')
  const instance = createInstance(options, id)
  messageInstances.set(id, instance)
  instance.open()
  return instance
}

/**
 * TODO 下个主版本去掉
 */
export const MessagePlugin = {
  text: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      ...option
    }),
  info: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      theme: 'info',
      ...option
    }),
  success: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      theme: 'success',
      ...option
    }),
  warning: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      theme: 'warning',
      ...option
    }),
  error: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      theme: 'error',
      ...option
    }),
  loading: (content: string, option?: MessageOptions) =>
    showMessage({
      content,
      type: 'loading',
      ...option
    }),
  destroyAll() {
    messageInstances.forEach((instance) => {
      instance.destroy()
    })
  }
}

export const useMessage = () => {
  return MessagePlugin
}
