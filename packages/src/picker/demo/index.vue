<template>
  <d-cell
    title="基础用法"
    :content="value1.toString()"
    @click="visible1 = true"
  />
  <d-picker
    v-model="value1"
    v-model:visible="visible1"
    title="标题"
    :columns="columns1"
  />

  <d-cell
    title="禁用选项"
    :content="value2.toString()"
    @click="visible2 = true"
  />
  <d-picker
    v-model="value2"
    v-model:visible="visible2"
    title="标题"
    :columns="columns2"
  />

  <d-cell
    title="级联选择"
    :content="value3.toString()"
    @click="visible3 = true"
  />
  <d-picker
    v-model="value3"
    v-model:visible="visible3"
    title="标题"
    :columns="template3"
  />
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import { PickerColumnsType } from '../props'
import addressJson from './data.json'

const visible1 = ref(false)
const template1 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const columns1 = ref<PickerColumnsType>(template1)
const value1 = ref(['0-3'])

const template2 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`,
  disabled: index === 0 || index === 5
}))
const visible2 = ref(false)
const columns2 = ref<PickerColumnsType>(template2)
const value2 = ref(['0-2'])

const visible3 = ref(false)
const value3 = ref(['110000', '110100', '110102'])
const template3 = ref(addressJson)
</script>
