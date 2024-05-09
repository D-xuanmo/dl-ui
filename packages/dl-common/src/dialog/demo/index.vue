<template>
  <d-button @click="visible = true">显示对话框</d-button>
  <d-button @click="showDialog">异步对话框</d-button>
  <d-dialog v-model:visible="visible" title="标题">
    对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容
  </d-dialog>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { useDialog, useMessage } from '@xuanmo/dl-common'

const visible = ref(false)

const dialog = useDialog()
const message = useMessage()

const showDialog = () => {
  const instance = dialog.confirm({
    content: '可以实现一些异步场景',
    onConfirm() {
      instance.update({ loading: true })
      return new Promise((resolve) => {
        setTimeout(() => {
          instance.update({ loading: false })
          message.success('完成')
          resolve(true)
        }, 3000)
      })
    }
  })
}
</script>
