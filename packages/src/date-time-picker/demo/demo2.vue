<template>
  <d-cell title="格式化列">
    <d-date-time-picker
      v-model="value"
      type="year-month"
      :formatter="format"
      display-formatter="yyyy年M月"
    />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormatterType } from '../props'

const value = ref('2022/4')

const format: FormatterType = (type, value) => {
  if (type === 'year') {
    return `${value}年`
  }
  if (type === 'month') {
    return `${value}月`
  }
  if (type === 'day') {
    return `${value}日`
  }
  return value
}
</script>
