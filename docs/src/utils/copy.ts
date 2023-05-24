import { message } from '@xuanmo/dl-ui'

export const copyText = (text: string, successMsg = '复制成功 🎉') => {
  window.navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success(successMsg)
    })
    .catch(() => {
      message.error('复制失败')
    })
}
