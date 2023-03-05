<template>
  <d-demo-block title="基础用法">
    <d-checkbox-group v-model="value">
      <d-checkbox value="1">选项1</d-checkbox>
      <d-checkbox value="2">选项2</d-checkbox>
    </d-checkbox-group>
  </d-demo-block>
  <d-demo-block title="禁用">
    <d-checkbox-group v-model="value" disabled>
      <d-checkbox value="1">选项1</d-checkbox>
      <d-checkbox value="2">选项2</d-checkbox>
    </d-checkbox-group>
  </d-demo-block>
  <d-demo-block title="水平排列">
    <d-checkbox-group v-model="value" direction="horizontal">
      <d-checkbox value="1">选项1</d-checkbox>
      <d-checkbox value="2">选项2</d-checkbox>
    </d-checkbox-group>
  </d-demo-block>
  <d-demo-block title="最大个数">
    <d-checkbox-group v-model="value2" :max="3">
      <d-checkbox value="1">选项1</d-checkbox>
      <d-checkbox value="2">选项2</d-checkbox>
      <d-checkbox value="3">选项3</d-checkbox>
      <d-checkbox value="4">选项4</d-checkbox>
      <d-checkbox value="5">选项5</d-checkbox>
    </d-checkbox-group>
  </d-demo-block>
  <d-demo-block title="搭配单元格使用">
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
  </d-demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['2'])
const value2 = ref(['1', '3'])
</script>
