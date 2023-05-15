<template>
  <d-cell title="最大、最小日期">
    <d-date-time-picker
      v-model="value"
      type="datetime"
      title="日期时间选择器"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('2022/4/15 22:58:00')
const currentDate = new Date()
const minDate = new Date(currentDate.getFullYear() - 5, 0, 6)
const maxDate = new Date(currentDate.getFullYear() + 5, 6, 20)
</script>
