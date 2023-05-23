import { showSuccessMessage, showFailMessage } from '@xuanmo/dl-ui'

export const copyText = (text: string, successMsg = '复制成功 🎉') => {
  window.navigator.clipboard
    .writeText(text)
    .then(() => {
      showSuccessMessage(successMsg)
    })
    .catch(() => {
      showFailMessage('复制失败')
    })
}
