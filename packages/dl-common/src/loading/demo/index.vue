<script setup lang="ts">
import { ref } from 'vue'
import { LoadingPlugin } from '../function-call'

const loading = ref(false)

setTimeout(() => {
  loading.value = true
}, 0)

const open = () => {
  const instance = LoadingPlugin.open({
    fullScreen: true
  })

  setTimeout(instance.close, 1000)
}
</script>

<template>
  <d-loading :loading="loading">
    <p v-for="i in 10" :key="i">{{ i }}</p>
  </d-loading>

  <d-button @click="open">全屏</d-button>
</template>
