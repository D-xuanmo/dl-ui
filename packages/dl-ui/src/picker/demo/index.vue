<template>
  <d-cell-group layout="vertical">
    <d-cell title="搭配单元格使用" content-align="right">
      <d-picker v-model="value1" title="直接使用" placeholder="请选择" :options="options1" />
    </d-cell>

    <d-cell title="多列选择" content-align="right">
      <d-picker v-model="value4" placeholder="请选择" :options="options4" />
    </d-cell>

    <d-cell title="异步获取数据" content-align="right">
      <d-picker v-model="value5" placeholder="请选择" :options="options5" />
    </d-cell>

    <d-cell title="搭配单元格使用(visible 外部受控)" content-align="right" @click="visible2 = true">
      <d-picker v-model="value2" v-model:visible="visible2" title="标题" :options="options2" />
    </d-cell>

    <d-cell
      title="级联选择"
      description="如果层级过多，如行政区域选择，推荐使用 Cascader级联选择器"
      @click="visible3 = true"
    >
      <d-picker v-model="value3" v-model:visible="visible3" title="标题" :options="template3" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PickerOptions } from '../props'

const template1 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const options1 = ref<PickerOptions>(template1)
const value1 = ref([])

const template4 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`
}))
const options4 = ref<PickerOptions>([template4, template4])
const value4 = ref(['0-1', '0-3'])

const options5 = ref([])
const value5 = ref([])

const template2 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`,
  disabled: index === 0 || index === 5
}))
const visible2 = ref(false)
const options2 = ref<PickerOptions>(template2)
const value2 = ref(['0-2'])

const visible3 = ref(false)
const value3 = ref([])
const template3 = ref([])

fetch(
  'https://admin.xuanmo.xin/api/my-admin/p/file/read/335f8ac3-f7f5-4408-ab30-a25000041190'
).then(async (res) => {
  const data = await res.json()
  template3.value = data
  options5.value = data.map((item) => {
    const { value, label } = item
    return { value, label }
  })
})
</script>
