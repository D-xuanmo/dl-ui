<template>
  <d-cell
    title="日期时间选择器"
    arrow
  >
    <d-date-picker
      v-model="value"
      type="datetime"
    />
  </d-cell>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import dateJS from '@xuanmo/datejs'

const value = ref(dateJS(new Date(2022, 3, 15, 22, 58)).format())
</script>
