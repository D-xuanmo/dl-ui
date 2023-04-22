# Radio 单选框

```vue playground=MRadio
<template>
  <p>基本用法</p>
  <d-radio-group v-model="value">
    <d-radio value="1" label="单选框1" />
    <d-radio value="2" label="单选框2" />
  </d-radio-group>

  <p>水平排列</p>
  <d-radio-group v-model="value" direction="horizontal">
    <d-radio value="1" label="单选框1" />
    <d-radio value="2" label="单选框2" />
  </d-radio-group>

  <p>禁用</p>
  <d-radio-group v-model="value" direction="horizontal" disabled>
    <d-radio value="1" label="单选框1" />
    <d-radio value="2" label="单选框2" />
  </d-radio-group>

  <p>搭配单元格</p>
  <d-radio-group v-model="value">
    <d-cell-group>
      <d-cell title="单选框1">
        <template #suffix>
          <d-radio value="1" />
        </template>
      </d-cell>
      <d-cell title="单选框2">
        <template #suffix>
          <d-radio value="2" />
        </template>
      </d-cell>
    </d-cell-group>
  </d-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>
```

## API

### Radio Props

| 参数            | 类型               | 默认值 | 说明           | 必传 |
| --------------- | ------------------ | ------ | -------------- | ---- |
| value           | `string \| number` | -      | 绑定值         | Y    |
| label           | `string`           | -      | 单选框显示文字 | Y    |
| default-checked | `boolean`          | -      | 是否默认选中   | N    |
| disabled        | `boolean`          | -      | 是否禁用       | N    |
| icon            | `string`           | -      | 图标名         | N    |

### RadioGroup Props

| 参数      | 类型               | 默认值     | 说明           | 必传 |
| --------- | ------------------ | ---------- | -------------- | ---- |
| v-model   | `string \| number` | -          | 当前选中的数据 | Y    |
| direction | `DirectionType`    | `vertical` | 参考公用类型   | N    |
| disabled  | `boolean`          | -          | 是否禁用       | N    |
| options   | `DataType[]`       | -          | 单选框数据项   | N    |
