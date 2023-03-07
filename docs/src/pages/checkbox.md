# Checkbox 复选框

```vue playground=1ben4 height=600
<template>
  <p>基础用法</p>
  <d-checkbox-group v-model="value">
    <d-checkbox value="1">选项1</d-checkbox>
    <d-checkbox value="2">选项2</d-checkbox>
  </d-checkbox-group>

  <p>禁用</p>
  <d-checkbox-group v-model="value" disabled>
    <d-checkbox value="1">选项1</d-checkbox>
    <d-checkbox value="2">选项2</d-checkbox>
  </d-checkbox-group>

  <p>水平排列</p>
  <d-checkbox-group v-model="value" direction="horizontal">
    <d-checkbox value="1">选项1</d-checkbox>
    <d-checkbox value="2">选项2</d-checkbox>
  </d-checkbox-group>

  <p>最大个数</p>
  <d-checkbox-group v-model="value2" :max="3">
    <d-checkbox value="1">选项1</d-checkbox>
    <d-checkbox value="2">选项2</d-checkbox>
    <d-checkbox value="3">选项3</d-checkbox>
    <d-checkbox value="4">选项4</d-checkbox>
    <d-checkbox value="5">选项5</d-checkbox>
  </d-checkbox-group>

  <p>搭配单元格使用</p>
  <d-checkbox-group v-model="value">
    <d-cell-group>
      <d-cell title="选项1">
        <template #suffix>
          <d-checkbox value="1" />
        </template>
      </d-cell>
      <d-cell title="选项2">
        <template #suffix>
          <d-checkbox value="2" />
        </template>
      </d-cell>
    </d-cell-group>
  </d-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['2'])
const value2 = ref(['1', '3'])
</script>
```
