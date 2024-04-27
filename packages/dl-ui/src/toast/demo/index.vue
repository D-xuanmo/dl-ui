<template>
  <d-space :gap="10" direction="vertical">
    <d-button block theme="primary" fill="outline" @click="visible1 = true">纯文本内容</d-button>
    <d-button block theme="primary" fill="outline" @click="visible2 = true">成功状态</d-button>
    <d-button block theme="primary" fill="outline" @click="visible3 = true">失败状态</d-button>
    <d-button block theme="primary" fill="outline" @click="visible4 = true">加载中状态</d-button>
    <d-button block theme="primary" fill="outline" @click="show('文本内容')">函数调用</d-button>
  </d-space>
  <d-toast v-model:visible="visible1">显示内容</d-toast>
  <d-toast v-model:visible="visible2" theme="success">保存成功</d-toast>
  <d-toast v-model:visible="visible3" theme="error">保存失败</d-toast>
  <d-toast v-model:visible="visible4" theme="loading">加载中...</d-toast>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToastPlugin } from '../index'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)

const show = (text: string) => {
  ToastPlugin.loading(text)
}
</script>
