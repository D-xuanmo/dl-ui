# Radio 单选框

用于选择数据中的某项，单选。

## 引入

```typescript
import { createApp } from 'vue';
import { DRadioGroup, DRadio } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DRadioGroup).use(DRadio)
```

## 代码演示

```vue client=Mobile playground=MRadio
<template>
  <dl-demo-block title="基本用法">
    <d-radio-group v-model="value">
      <d-radio value="1" label="单选框1" />
      <d-radio value="2" label="单选框2" />
    </d-radio-group>
  </dl-demo-block>
  <dl-demo-block title="水平排列">
    <d-radio-group v-model="value" direction="horizontal">
      <d-radio value="1" label="单选框1" />
      <d-radio value="2" label="单选框2" />
    </d-radio-group>
  </dl-demo-block>
  <dl-demo-block title="禁用">
    <d-radio-group v-model="value" direction="horizontal" disabled>
      <d-radio value="1" label="单选框1" />
      <d-radio value="2" label="单选框2" />
    </d-radio-group>
  </dl-demo-block>
  <dl-demo-block title="搭配单元格">
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
  </dl-demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>
```

## API

### Radio Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|value|`string \| number`|-|绑定值|Y|
|label|`string`|-|单选框显示文字|Y|
|default-checked|`boolean`|-|是否默认选中|N|
|disabled|`boolean`|-|是否禁用|N|
|icon|`string`|-|图标名|N|
|keys|`CustomKeys`|-|自定义数据源中的属性，`label`、`value`、`children` 别名，[公用类型定义](https://uoo.ink/common)|N|

### RadioGroup Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`string \| number`|-|当前选中的数据|Y|
|direction|`DirectionType`|`vertical`|参考公用类型|N|
|disabled|`boolean`|-|是否禁用|N|
|options|`IData[]`|-|单选框数据项|N|

### TypeScript 类型

```typescript
export type DirectionType = 'horizontal' | 'vertical'

/** 数据基础类型，单选、多选、选择器等组件 */
export interface DataType {
  label: string
  value: string | number
  disabled?: boolean
}

import type {
  RadioProps,
  RadioGroupProps,
  IData,
  DirectionType
} from '@xuanmo/dl-ui'
```
