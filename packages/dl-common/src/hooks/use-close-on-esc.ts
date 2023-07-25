/**
 * @created: 2023/7/25
 * @author: Xuanmo
 * @desc: 统一管理需要使用 esc 关闭的弹框、抽屉等实例
 */

import { onUnmounted, Ref, watch } from 'vue'

const visibleIdList: string[] = []

const closeHandlerMap: Map<string, () => void> = new Map()

let index = 0

export const useCloseOnEsc = (
  visible: Ref<boolean>,
  options: {
    type: string
    closeOnEsc?: boolean
    closeFN: () => void
  }
) => {
  const { type, closeOnEsc, closeFN } = options
  const id = `${type}@${index}`
  closeHandlerMap.set(id, closeFN)
  index++

  const onClose = () => {
    const [activeId] = [...visibleIdList].reverse()
    if (activeId === id) closeHandlerMap.get(id)?.()
  }

  onUnmounted(() => {
    closeHandlerMap.delete(id)
  })

  watch(
    () => visible.value,
    (visible) => {
      if (closeOnEsc) {
        if (visible) {
          visibleIdList.push(id)
          document.addEventListener('keydown', onClose)
        } else {
          visibleIdList.pop()
          document.removeEventListener('keydown', onClose)
        }
      }
    }
  )
}
