import { ActionSheetProps } from './props'
import { mountComponent, RequiredProperties } from '@xuanmo/dl-common'
import ActionSheet from './action-sheet.vue'
import { ref } from 'vue'

type ActionInstance = {
  open: () => void
}

type OptionsType = RequiredProperties<ActionSheetProps, 'options'>

const createInstance = (options: OptionsType) => {
  const { instance, unmount } = mountComponent({
    setup(_props, ctx) {
      const visible = ref(false)

      const open = () => {
        visible.value = true
      }

      const close = () => {
        visible.value = false
        unmount()
      }

      ctx.expose({ destroy: close, open })

      return () => {
        const attrs = {
          ...options,
          visible: visible.value,
          'onUpdate:visible': close
        }
        return <ActionSheet {...attrs} />
      }
    }
  })

  return instance as ActionInstance
}

export const useActionSheet = () => {
  return (options: OptionsType) => {
    createInstance(options).open()
  }
}
