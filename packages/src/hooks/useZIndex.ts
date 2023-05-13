import { Ref, ref } from 'vue'

let globalZIndex = 2000

/**
 * 统一处理 zIndex
 * @param props 组件 props
 * @param autoIncrement 是否需要自增
 */
function useZIndex<P>(props: P & { zIndex?: number }, autoIncrement = true) {
  const defaultZIndex = props.zIndex ?? globalZIndex

  const zIndex = ref(defaultZIndex)

  function setZIndex() {
    globalZIndex = zIndex.value ? zIndex.value + 1 : globalZIndex + 1
  }

  autoIncrement && setZIndex()

  return [zIndex, setZIndex] as [Ref<number>, typeof setZIndex]
}

export default useZIndex
