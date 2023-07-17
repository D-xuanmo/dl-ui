import { MessagePlugin } from '@xuanmo/dl-ui'

export const copyText = (text: string, successMsg = '复制成功 🎉') => {
  window.navigator.clipboard
    .writeText(text)
    .then(() => {
      MessagePlugin.success(successMsg)
    })
    .catch(() => {
      MessagePlugin.error('复制失败')
    })
}
