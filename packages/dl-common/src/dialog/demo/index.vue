<template>
  <d-button @click="visible = true">显示对话框</d-button>
  <d-dialog v-model:visible="visible" title="标题">
    对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容
  </d-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped lang="scss"></style>
