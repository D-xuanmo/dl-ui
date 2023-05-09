# Cascader 级联选择器

用于树形数据选择，常用于地址选择

```vue client=Mobile playground=MCascader
<template>
  <d-cell-group>
    <d-cell title="基础用法">
      <d-cascader v-model="value" :columns="template" title="请选择地址" />
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

fetch('/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727').then(async (res) => {
  template.value = await res.json()
})
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|----|---|-----|---|----|
|v-model|`CascaderValue`|-|组件选择的值|Y|
|options|`CascadeOption[]`|-|选项数据|Y|
|placeholder|`string`|-|提示语|N|
|title|`string`|-|支持设置一个顶部标题|N|
|disabled|`boolean`|`false`|是否禁用|N|
|readonly|`boolean`|`false`|是否只读|N|
|lazy|`boolean`|`false`|是否开启懒加载|N|
|lazy-load|`(option: CascadeOption) => Promise<CascadeOption[]>`|-|数据懒加载方法，需要配合 `lazy` 使用|N|
|cancel-button-text|`string`|`取消`|关闭按钮文字|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|
