<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from '@xuanmo/dl-common'

const loadingStatus = ref(false)
const loading = useLoading()

setTimeout(() => {
  loadingStatus.value = true
}, 0)

const open = () => {
  const instance = loading.open({
    fullScreen: true
  })

  setTimeout(instance.close, 1000)
}
</script>

<template>
  <d-loading :loading="loadingStatus">
    <p v-for="i in 10" :key="i">{{ i }}</p>
  </d-loading>

  <d-button @click="open">全屏</d-button>
</template>
