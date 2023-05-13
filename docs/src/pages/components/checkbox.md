# Checkbox 复选框

用于选择数据中的某些项，多选

```vue client=Mobile playground=MCheckbox
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
```

## API

### Checkbox Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|value|`string \| number`|-|绑定值|Y|
|label|`string`|-|单选框显示文字|Y|
|default-checked|`boolean`|-|是否默认选中|N|
|disabled|`boolean`|-|是否禁用|N|
|icon|`string`|-|图标名|N|

### CheckboxGroup Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`string \| number`|-|当前选中的数据|Y|
|direction|`DirectionType`|`vertical`|参考公用类型|N|
|disabled|`boolean`|-|是否禁用|N|
|max|`number`|-|最大选择个数|N|
|options|`IData[]`|-|复选框数据项|N|

### TypeScript 类型

```typescript
export type DirectionType = 'horizontal' | 'vertical'

/** 数据基础类型，单选、多选、选择器等组件 */
export interface IData {
  label: string
  value: string | number
  disabled?: boolean
}

import type {
  CheckboxProps,
  CheckboxGroupProps,
  IData,
  DirectionType
} from '@xuanmo/dl-ui'
```
