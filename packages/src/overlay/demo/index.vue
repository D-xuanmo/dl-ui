<template>
  <d-cell title="打开遮罩层">
    <d-switch v-model="visible" />
    <d-overlay v-model:visible="visible" />
  </d-cell>
  <d-cell title="修改过渡时间" title-width="100px">
    <d-switch v-model="visible2" />
    <d-overlay v-model:visible="visible2" duration="1s" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>
