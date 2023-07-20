<template>
  <d-button @click="visible = true">显示对话框</d-button>
  <d-button @click="showDialog">异步对话框</d-button>
  <d-dialog v-model:visible="visible" title="标题">
    对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容
  </d-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DialogPlugin, MessagePlugin } from '@xuanmo/dl-common'

const visible = ref(false)

const showDialog = () => {
  const dialog = DialogPlugin.confirm({
    content: '可以实现一些异步场景',
    onConfirm() {
      dialog.update({ loading: true })
      return new Promise((resolve) => {
        setTimeout(() => {
          dialog.update({ loading: false })
          MessagePlugin.success('完成')
          resolve(true)
        }, 3000)
      })
    }
  })
}
</script>
