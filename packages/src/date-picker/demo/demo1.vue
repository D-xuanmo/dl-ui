<template>
  <d-cell title="日期时间选择器" arrow>
    <d-date-picker v-model="value" type="datetime" title="日期时间选择器" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('2022/4/15 22:58:00')
</script>
