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

  const style = ref({ height: addUnit(0) })

  const calcHeight = async () => {
    if (autosize) {
      hiddenTextarea!.value = value.value
      await nextTick()
      style.value = {
        height: addUnit(hiddenTextarea!.scrollHeight)
      }
    }
  }

  watch(() => value.value, calcHeight)

  onMounted(() => {
    if (autosize) {
      if (!hiddenTextarea) {
        const { width, fontSize, lineHeight } = window.getComputedStyle(
          targetEl.value || document.body
        )
        const style = `
          position: absolute;
          top: 0;
          left: 0;
          z-index: -10000;
          width: ${width};
          visibility: hidden;
          font-size: ${fontSize};
          line-height: ${lineHeight};
        `
        hiddenTextarea = document.createElement('textarea')
        hiddenTextarea.classList.add('d-textarea__inner')
        hiddenTextarea.value = value.value
        hiddenTextarea.setAttribute('style', style)
        hiddenTextarea.setAttribute('rows', `${targetEl.value?.rows}`)
        document.body.appendChild(hiddenTextarea)
      }
      style.value = {
        height: addUnit(hiddenTextarea!.scrollHeight)
      }
    }
  })

  onUnmounted(() => {
    if (autosize && hiddenTextarea) {
      document.body.removeChild(hiddenTextarea)
      hiddenTextarea = null
    }
  })

  return autosize ? style : {}
}
