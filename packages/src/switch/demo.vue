<template>
  <DCell title="基础用法">
    <DSwitch v-model="value" />
    <DSwitch :value="value" />
  </DCell>
  <DCell title="默认值">
    <DSwitch v-model="value1" />
  </DCell>
  <DCell title="方形">
    <DSwitch
      v-model="value"
      :round="false"
    />
  </DCell>
  <DCell title="禁用">
    <DSwitch
      v-model="value"
      disabled
    />
  </DCell>
  <DCell title="自定义图标">
    <DSwitch v-model="value">
      <template #icon>🤓</template>
    </DSwitch>
  </DCell>
  <DCell title="自定义图标">
    <DSwitch v-model="value">
      <template #checked-icon>🌝</template>
      <template #unchecked-icon>🌚</template>
    </DSwitch>
  </DCell>
  <DCell title="模拟请求">
    <DSwitch
      v-model="value2"
      :loading="loading"
      :before-change="beforeChange"
    />
  </DCell>
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
