import { nextTick, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { addUnit } from '@xuanmo/dl-common'
import { TextareaProps } from './props'

let hiddenTextarea: HTMLTextAreaElement | null

/**
 * 自动计算多行文本高度
 * @param value 当前输入值
 * @param targetEl 当前多行文本元素
 * @param otherParams
 */
export const useCalcTextareaHeight = (
  value: Ref<string>,
  targetEl: Ref<HTMLTextAreaElement | null>,
  otherParams: Pick<TextareaProps, 'autosize'>
) => {
  const { autosize } = otherParams
  let timer: ReturnType<typeof setTimeout>
  if (!hiddenTextarea) {
    const style = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10000;
      overflow: hidden;
      visibility: hidden;
    `
    hiddenTextarea = document.createElement('textarea')
    hiddenTextarea.classList.add('d-textarea__inner')
    hiddenTextarea.value = value.value
    document.body.appendChild(hiddenTextarea)
    hiddenTextarea.setAttribute('style', style)
  }

  const height = ref({ height: addUnit(0) })

  const calcHeight = async () => {
    if (autosize) {
      hiddenTextarea!.value = value.value
      await nextTick()
      timer = setTimeout(() => {
        height.value = {
          height: addUnit(hiddenTextarea!.scrollHeight)
        }
      })
    }
  }

  watch(() => value.value, calcHeight)

  onMounted(() => {
    if (autosize) {
      hiddenTextarea!.style.width = addUnit(targetEl.value?.offsetWidth)
      hiddenTextarea!.setAttribute('rows', `${targetEl.value?.rows}`)
      height.value = {
        height: addUnit(hiddenTextarea!.scrollHeight)
      }
    }
  })

  onUnmounted(() => {
    if (autosize && hiddenTextarea) {
      document.body.removeChild(hiddenTextarea)
      hiddenTextarea = null
      clearTimeout(timer)
    }
  })

  return autosize ? height : {}
}
