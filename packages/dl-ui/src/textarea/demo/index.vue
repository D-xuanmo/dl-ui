<template>
  <d-cell-group cell-title-width="100">
    <d-cell title="基础用法">
      <d-textarea v-model="value1" placeholder="请输入内容" />
    </d-cell>
    <d-cell title="自动撑高">
      <d-textarea v-model="value2" placeholder="请输入内容" autosize />
    </d-cell>
    <d-cell title="显示字数统计">
      <d-textarea v-model="value3" placeholder="请输入内容" :maxlength="100" show-word-limit />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
