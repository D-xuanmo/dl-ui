<template>
  <d-cell title="基础用法">
    <d-switch v-model="value" />
    <d-switch :value="value" />
  </d-cell>
  <d-cell title="默认值">
    <d-switch v-model="value1" />
  </d-cell>
  <d-cell title="方形">
    <d-switch
      v-model="value"
      :round="false"
    />
  </d-cell>
  <d-cell title="禁用">
    <d-switch
      v-model="value"
      disabled
    />
  </d-cell>
  <d-cell title="自定义图标">
    <d-switch v-model="value">
      <template #icon>🤓</template>
    </d-switch>
  </d-cell>
  <d-cell title="自定义图标">
    <d-switch v-model="value">
      <template #checked-icon>🌝</template>
      <template #unchecked-icon>🌚</template>
    </d-switch>
  </d-cell>
  <d-cell title="模拟请求">
    <d-switch
      v-model="value2"
      :loading="loading"
      :before-change="beforeChange"
    />
  </d-cell>
</template>
<script setup>
import { ref } from 'vue'

const value = ref(false)
const value1 = ref(true)
const value2 = ref(false)
const loading = ref(false)

function beforeChange() {
  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false
      resolve(true)
    }, 1000)
  })
}
</script>
