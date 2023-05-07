<template>
  <d-cell-group cell-title-width="100px">
    <d-cell title="基础用法">
      <d-cascader v-model="value" :columns="template" />
    </d-cell>
    <d-cell title="绑定对象数组">
      <d-cascader v-model="value2" :columns="template" title="请选择地址" />
    </d-cell>
    <d-cell title="禁用">
      <d-cascader v-model="value" :columns="template" disabled />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const template = ref([])
const value = ref(['310000', '310100', '310115'])
const value2 = ref([
  { value: '110000', label: '北京市' },
  { value: '110100', label: '市辖区' },
  { value: '110102', label: '西城区' }
])

fetch('/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727').then(async (res) => {
  template.value = await res.json()
})
</script>
