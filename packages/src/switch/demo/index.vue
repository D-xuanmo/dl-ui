<template>
  <d-cell-group cell-content-align="right">
    <d-cell title="基础用法">
      <d-switch v-model="value" />
    </d-cell>
    <d-cell title="尺寸">
      <d-space gap='5' justify='end'>
        <d-switch v-model="value" size='small' />
        <d-switch v-model="value" size='medium' />
        <d-switch v-model="value" size='large' />
      </d-space>
    </d-cell>
    <d-cell title="方形尺寸">
      <d-space gap='5' justify='end'>
        <d-switch v-model="value" size='small' :round="false" />
        <d-switch v-model="value" size='medium' :round="false" />
        <d-switch v-model="value" size='large' :round="false" />
      </d-space>
    </d-cell>
    <d-cell title="禁用">
      <d-switch v-model="value" disabled />
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
      <d-switch v-model="value2" :loading="loading" :before-change="beforeChange" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
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
