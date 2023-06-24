<template>
  <dl-demo-block title="基础用法">
    <d-space :gap="10" wrap>
      <d-button fill="outline" theme="default" @click="showInfo">info</d-button>
      <d-button fill="outline" theme="default" @click="showLoading">loading</d-button>
      <d-button fill="outline" theme="success" @click="showSuccess">success</d-button>
      <d-button fill="outline" theme="warning" @click="showWarning">warning</d-button>
      <d-button fill="outline" theme="danger" @click="showError">error</d-button>
    </d-space>
  </dl-demo-block>
  <dl-demo-block title="手动关闭">
    <d-space :gap="10">
      <d-button fill="outline" theme="default" @click="manual">打开</d-button>
      <d-button fill="outline" theme="default" @click="messageInstance?.destroy()">关闭</d-button>
    </d-space>
  </dl-demo-block>
</template>

<script setup lang="ts">
import { message, MessageInstance } from '../'
const showInfo = () => message.info('消息内容')
const showSuccess = () => message.success('成功消息内容')
const showWarning = () => message.warning('警告消息内容')
const showError = () => message.error('消息内容')
const showLoading = () => message.loading('加载中...')

let messageInstance: MessageInstance | null = null
const manual = () => {
  messageInstance = message.info('我不会自动关闭', {
    duration: 0
  })
}
</script>
