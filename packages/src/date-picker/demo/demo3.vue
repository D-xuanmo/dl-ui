<template>
  <d-cell
    title="格式化列"
    arrow
  >
    <d-date-picker
      v-model="value"
      type="date"
      :formatter="format"
    />
  </d-cell>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import { FormatterType } from '../props'

const value = ref('2022/4/15 22:58:00')

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
