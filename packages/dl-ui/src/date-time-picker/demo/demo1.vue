<template>
  <d-cell title="日期时间选择器">
    <d-date-time-picker v-model="value1" type="datetime" />
  </d-cell>
  <d-cell title="日期时分选择器">
    <d-date-time-picker v-model="value2" type="date-hour-minute" />
  </d-cell>
  <d-cell title="日期时选择器">
    <d-date-time-picker v-model="value3" type="date-hour" />
  </d-cell>
  <d-cell title="日期选择器">
    <d-date-time-picker v-model="value4" type="date" />
  </d-cell>
  <d-cell title="年月选择">
    <d-date-time-picker v-model="value5" type="year-month" />
  </d-cell>
  <d-cell title="年选择">
    <d-date-time-picker v-model="value8" type="year" />
  </d-cell>
  <d-cell title="月日选择">
    <d-date-time-picker v-model="value6" type="month-day" />
  </d-cell>
  <d-cell title="时间选择">
    <d-date-time-picker v-model="value7" type="time" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('2022/4/15 22:58:00')
const value2 = ref('2022/4/15 22:58')
const value3 = ref('2022/4/15 22')
const value4 = ref('2022/4/15')
const value5 = ref('2022/4')
const value6 = ref('4/15')
const value7 = ref('22:58')
const value8 = ref('2022')
</script>
