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

```vue client=Mobile
<template>
  <d-config-provider
    :layout="formLayout"
    :required-mark-position="requiredMarkPosition"
    :label-width="labelWidth"
  >
    <d-cell-group title="表单操作" cell-title-width="100px" style="margin-bottom: var(--d-gap-sm)">
      <d-cell title="标题宽度">
        <d-input v-model="labelWidth" type="number" />
      </d-cell>
      <d-cell title="布局切换">
        <d-radio-group v-model="formLayout" :options="formLayoutOptions" direction="horizontal" />
      </d-cell>
      <d-cell title="必填标识位置">
        <d-radio-group
          v-model="requiredMarkPosition"
          :options="requiredMarkPositionOptions"
          direction="horizontal"
        />
      </d-cell>
    </d-cell-group>
    <d-form :models="formModels" client-type="MOBILE" />
  </d-config-provider>
</template>

<script setup lang="ts">
import { FormModels } from '@xuanmo/dl-common'
import { ref } from 'vue'

const formLayout = ref<any>('horizontal')
const requiredMarkPosition = ref<any>('left')
const labelWidth = ref(80)

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
    placeholder: '请输入'
  }
]
</script>
```

## Props

|参数|类型|默认值|说明|必传|
|---|---|------|---|---|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型|N|
|required-mark-position|`'left' \| 'right'`|`right`|必填标识显示位置|N|
|label-width|`string \| number`|`80px`|标题宽度|N|
