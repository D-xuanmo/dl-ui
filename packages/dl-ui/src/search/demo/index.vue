<template>
  <d-cell-group layout="vertical">
    <d-cell title="基础用法">
      <d-search v-model="value" placeholder="请输入关键词" />
    </d-cell>
    <d-cell title="显示圆角">
      <d-search v-model="value" :round="true" />
    </d-cell>
    <d-cell title="对齐方式">
      <d-search v-model="value" input-align="center" />
    </d-cell>
    <d-cell title="禁用状态">
      <d-search v-model="value" :disabled="true" />
    </d-cell>
    <d-cell title="只读状态">
      <d-search v-model="value" :readonly="true" />
    </d-cell>
  </d-cell-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
