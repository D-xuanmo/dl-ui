<template>
  <d-tabs v-model="active">
    <d-tab-panel v-for="item in list" :key="item.name" :name="item.name" :label="item.label">
      <div style="padding: 30px 0">{{ item.label }}</div>
    </d-tab-panel>
  </d-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref('1')

const list = Array.from({ length: 5 }).map((_, index) => ({
  name: `${index}`,
  label: `标签页${index + 1}`
}))
</script>
