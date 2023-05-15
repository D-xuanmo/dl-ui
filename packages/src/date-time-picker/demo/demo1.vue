<template>
  <d-cell title="日期时间选择器">
    <d-date-time-picker v-model="value1" type="datetime" />
  </d-cell>
  <d-cell title="日期选择器">
    <d-date-time-picker v-model="value2" type="date" />
  </d-cell>
  <d-cell title="年月选择">
    <d-date-time-picker v-model="value3" type="year-month" />
  </d-cell>
  <d-cell title="月日选择">
    <d-date-time-picker v-model="value4" type="month-day" />
  </d-cell>
  <d-cell title="时间选择">
    <d-date-time-picker v-model="value5" type="time" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('2022/4/15 22:58:00')
const value2 = ref('2022/4/15')
const value3 = ref('2022/4')
const value4 = ref('4/15')
const value5 = ref('22:58')
</script>
