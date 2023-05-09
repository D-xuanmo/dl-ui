# Picker 选择器

> 目前只支持移动端事件

```vue client=Mobile playground=MPicker
<template>
  <d-cell-group>
    <d-cell title="搭配单元格使用" content-align="right">
      <d-picker v-model="value1" title="直接使用" placeholder="请选择" :options="options1" />
    </d-cell>

    <d-cell title="多列选择" content-align="right">
      <d-picker v-model="value4" placeholder="请选择" :options="options4" />
    </d-cell>

    <d-cell title="搭配单元格使用(visible 外部受控)" content-align="right" @click="visible2 = true">
      <d-picker v-model="value2" v-model:visible="visible2" title="标题" :options="options2" />
    </d-cell>

    <d-cell title="级联选择" @click="visible3 = true">
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

const template2 = Array.from(new Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: `0-${index + 1}`,
  disabled: index === 0 || index === 5
}))
const visible2 = ref(false)
const options2 = ref<PickerOptions>(template2)
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
```

## API

### Props

|参数|类型|默认值|说明|必传|
|----|---|-----|---|----|
|v-model|`string[] \| number[] \| DataType[]`|-|当前选中的数据|Y|
|visible|`boolean`|`false`|显示与隐藏|N|
|options|`PickerOptions`|[]|选择器列数据|N|
|title|`string`|-|支持设置一个顶部标题|N|
|disabled|`boolean`|-|是否禁用|N|
|readonly|`boolean`|-|是否只读|N|
|cancel-button-text|`string`|`取消`|关闭按钮文字|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|
|option-height|`number`|42|单个选项高度|N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:visible|显示隐藏事件|`(visible: boolean) => void`|
|change|确认事件|`(value: PickerValue, data: DataType) => void`|
|confirm|确认事件|`(value: PickerValue) => void`|
|close|关闭事件|`() => void`|

## 选择器公用类型

> 公用类型 [https://github.com/D-xuanmo/dl-ui/blob/develop/packages/src/common.ts](https://github.com/D-xuanmo/dl-ui/blob/develop/packages/src/common.ts)

```typescript
export type PickerValue = string[] | number[] | DataType[]

/** 选择器每列数据类型 */
export type PickerOption = DataType | CascadeOption

/** 选择器数据类型 */
export type PickerOptions = PickerOption[] | PickerOption[][]
```
