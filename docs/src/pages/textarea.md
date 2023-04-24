# Textarea 多行文本框

用于输入多行内容。

```vue client=Mobile playground=MTextarea
<template>
  <d-cell-group cell-title-width="100">
    <d-cell title="基础用法">
      <d-textarea v-model="value1" placeholder="请输入内容" />
    </d-cell>
    <d-cell title="自动撑高">
      <d-textarea v-model="value2" placeholder="请输入内容" autosize />
    </d-cell>
    <d-cell title="显示字数统计">
      <d-textarea v-model="value3" placeholder="请输入内容" :maxlength="100" show-word-limit />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```

## API

### Props

| 参数            | 类型      | 默认值 | 说明                                   | 必传 |
| --------------- | --------- | ------ | -------------------------------------- | ---- |
| v-model         | `string`  | -      | 组件数据                               | Y    |
| disabled        | `boolean` | -      | 表单禁用                               | N    |
| readonly        | `boolean` | -      | 表单只读 2                             | N    |
| maxlength       | `number`  | -      | 最大长度，原生属性                     | N    |
| rows            | `number`  | 3      | 显示行数，原生属性                     | N    |
| placeholder     | `string`  | -      | 提示语，原生属性                       | N    |
| show-word-limit | `boolean` | -      | 是否显示字数统计，需要开启 `maxlength` | N    |
| autosize        | `boolean` | -      | 是否输入内容自动撑高                   | N    |
