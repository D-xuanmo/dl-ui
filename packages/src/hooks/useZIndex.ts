import { getCurrentInstance, inject, Ref, ref } from 'vue'
import { GLOBAL_CONFIG_CONTEXT_KEY } from '../context'

/**
 * 统一处理 zIndex
 * @param props 组件 props
 * @param autoIncrement 是否需要自增
 */
function useZIndex<P>(props: P & { zIndex?: number }, autoIncrement = true) {
  const { proxy } = getCurrentInstance() ?? {}
  const globalConfig = inject(GLOBAL_CONFIG_CONTEXT_KEY) ?? {}

  const defaultZIndex = props.zIndex ?? globalConfig.zIndex

  const zIndex = ref(defaultZIndex)

  const newZIndex = zIndex.value ? zIndex.value + 1 : (proxy?.$DForm?.zIndex ?? 2000) + 1

  function setZIndex() {
    if (proxy?.$DForm) {
      proxy.$DForm.zIndex = newZIndex
    }
  }

  autoIncrement && setZIndex()

  return [zIndex, setZIndex] as [Ref<number>, typeof setZIndex]
}

export default useZIndex
