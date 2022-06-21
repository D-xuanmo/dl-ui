<template>
  <d-cell
    title="基础用法"
    :content="`${value}`"
    @click="visible = true"
  />
  <d-picker
    v-model:visible="visible"
    v-model="value"
    title="标题"
    :columns="columns"
  />
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import { PickerColumnsType } from './props'
const visible = ref(false)
const template = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const columns = ref<PickerColumnsType>([template, template])
const value = ref(['0-1', '0-2'])
</script>
