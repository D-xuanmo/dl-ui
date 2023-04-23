<template>
  <d-cell-group>
    <d-cell title="搭配单元格使用" content-align="right">
      <d-picker v-model="value1" title="直接使用" placeholder="请选择" :columns="columns1" />
    </d-cell>

    <d-cell title="多列选择" content-align="right">
      <d-picker v-model="value4" placeholder="请选择" :columns="columns4" />
    </d-cell>

    <d-cell title="搭配单元格使用(visible 外部受控)" content-align="right" @click="visible2 = true">
      <d-picker v-model="value2" v-model:visible="visible2" title="标题" :columns="columns2" />
    </d-cell>

    <d-cell title="级联选择" @click="visible3 = true">
      <d-picker v-model="value3" v-model:visible="visible3" title="标题" :columns="template3" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PickerColumnsType } from '../props'

const template1 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const columns1 = ref<PickerColumnsType>(template1)
const value1 = ref([])

const template4 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const columns4 = ref<PickerColumnsType>([template4, template4])
const value4 = ref(['0-1', '0-3'])

const template2 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`,
  disabled: index === 0 || index === 5
}))
const visible2 = ref(false)
const columns2 = ref<PickerColumnsType>(template2)
const value2 = ref(['0-2'])

const visible3 = ref(false)
const value3 = ref([
  { value: '110000', label: '北京市' },
  { value: '110100', label: '市辖区' },
  { value: '110102', label: '西城区' }
])
const template3 = ref([])

fetch('https://raw.githubusercontent.com/D-xuanmo/v-form/master/packages/Address/data.json').then(
  async (res) => {
    template3.value = await res.json()
  }
)
</script>
