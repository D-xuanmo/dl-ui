<template>
  <d-cell title="时间选择器">
    <d-date-picker v-model="value" type="time" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date(2022, 3, 15, 22, 58))
</script>
