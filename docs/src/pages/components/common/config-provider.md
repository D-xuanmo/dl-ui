# ConfigProvider 全局化配置

为组件提供全局统一的配置。

## 引入

```typescript
import { createApp } from 'vue';
import { DConfigProvider } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DConfigProvider)
```

```vue client=Mobile playground=ConfigProvider
<template>
  <d-cell-group title="表单操作" cell-title-width="100px">
    <d-cell title="标题宽度">
      <d-input v-model="labelWidth" type="number" />
    </d-cell>
    <d-cell title="显示冒号">
      <d-switch v-model="colon" />
    </d-cell>
    <d-cell title="布局切换">
      <d-radio-group
      v-model="formLayout"
      :options="formLayoutOptions"
      direction="horizontal"
    />
    </d-cell>
    <d-cell title="必填标识位置">
      <d-radio-group
        v-model="requiredMarkPosition"
        :options="requiredMarkPositionOptions"
        direction="horizontal"
      />
    </d-cell>
  </d-cell-group>

  <d-config-provider
    :layout="formLayout"
    :required-mark-position="requiredMarkPosition"
    :label-width="labelWidth"
    :colon="colon"
    :theme="{ primary: '#0FB57DFF' }"
  >
    <d-cell title="单元格" required>我是单元格内容</d-cell>
    <d-form :models="formModels" client-type="MOBILE" />
  </d-config-provider>
</template>

<script setup lang="ts">
import { FormModels } from '../../form'
import { ref } from 'vue'

const formLayout = ref<any>('horizontal')
const requiredMarkPosition = ref<any>('left')
const labelWidth = ref(80)
const colon = ref(false)

const formLayoutOptions = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' }
]
const requiredMarkPositionOptions = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' }
]

const formModels: FormModels = [
  {
    id: 'input',
    dataKey: 'input',
    label: '输入框',
    required: true,
    component: 'DInput',
    layout: {
      parent: 'root'
    },
    placeholder: '请输入',
    value: ''
  },
  {
    id: 'switch',
    dataKey: 'switch',
    label: '开关',
    required: true,
    component: 'DSwitch',
    layout: {
      parent: 'root'
    },
    value: true
  }
]
</script>
```

## Props

|参数|类型|默认值|说明|必传|
|---|---|------|---|---|
|theme|`ConfigProviderTheme`|-|修改主题颜色|N|
|keys|`CustomKeys`|-|自定义数据源中的属性，`label`、`value`、`children` 别名，[公用类型定义](https://uoo.ink/common)|N|
|colon|`boolean`|`false`|是否显示冒号，仅 `Form` 支持|N|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型，支持的组件有：`Cell`、`Form`|N|
|required-mark-position|`'left' \| 'right'`|`right`|必填标识显示位置，支持的组件有：`Cell`、`Form`|N|
|label-width|`string \| number`|`80px`|标题宽度，支持的组件有：`Cell`、`Form`|N|

## TS 类型

```typescript
type ConfigProviderTheme = {
  // 主题色
  primary?: string

  // 成功提示
  success?: string

  // 警告提示
  warning?: string

  // 错误提示
  error?: string
}
```
