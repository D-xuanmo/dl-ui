# Radio 单选框

```vue playground=39u97n8
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
