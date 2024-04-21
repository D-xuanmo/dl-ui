# Search 搜索框

用于搜索场景的输入框。

## 引入

```typescript
import { createApp } from 'vue';
import { DSearch } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DSearch)
```

## 代码演示

```vue client=Mobile playground=MSearch previewType=iframe

<template>
  <d-cell-group layout='vertical'>
    <d-cell title='基础用法'>
      <d-search v-model='value' placeholder='请输入关键词' />
    </d-cell>
    <d-cell title='显示高级搜索'>
      <d-search
        v-model='value'
        placeholder='请输入关键词'
        :advanced-search='true'
        :form-props='{ models: formModels }'
        @confirm='onConfirm'
      />
    </d-cell>
    <d-cell title='显示圆角'>
      <d-search v-model='value' :round='true' />
    </d-cell>
    <d-cell title='对齐方式'>
      <d-search v-model='value' input-align='center' />
    </d-cell>
    <d-cell title='禁用状态'>
      <d-search v-model='value' :disabled='true' />
    </d-cell>
    <d-cell title='只读状态'>
      <d-search v-model='value' :readonly='true' />
    </d-cell>
  </d-cell-group>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import { FormModels } from '@xuanmo/dl-common'

  const value = ref('')

  const formModels: FormModels = [
    {
      id: 'group1',
      component: 'DFormCellGroup',
      label: '分组 1',
      layout: {
        parent: 'root'
      }
    },
    {
      id: 'group2',
      component: 'DFormCellGroup',
      label: '分组 2',
      layout: {
        parent: 'root'
      }
    },
    {
      id: 'id1',
      dataKey: 'inputKey',
      component: 'DInput',
      label: '输入框',
      layout: {
        parent: 'group1'
      },
      placeholder: '请输入需要查询的名称',
      value: ''
    },
    ...Array.from({ length: 20 }).map((_, index) => ({
      id: `id0${index}`,
      dataKey: `timeKey0${index}`,
      component: 'DDateTimePicker',
      label: `日期时间${index}`,
      layout: {
        parent: 'group2'
      }
    }))
  ]

  const onConfirm = (value) => {
    console.log(value)
  }
</script>

```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`string`|-|输入值|N|
|name|`string`|-|input 原生属性|N|
|placeholder|`string`|-|输入框占位符|N|
|disabled|`boolean`|-|是否禁用|N|
|readonly|`boolean`|-|是否只读|N|
|round|`boolean`|-|是否显示圆角|N|
|autofocus|`boolean`|-|自动聚焦，原生属性|N|
|input-align|`string`|-|输入框文字对齐方式，可选值：`left/center/right`|N|
|maxlength|`number`|-|最大长度，原生属性|N|
|autocomplete|`string`|-|原生属性，[MDN-autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)|N|
|clearable|`boolean`|-|显示可清空按钮|N|
|formatter|`(value: string) => string`|-|格式化函数|N|
|formatter-trigger|`string`|`onChange`|格式化函数触发时机，可选值：`onBlur`|N|
|advanced-search|`boolean`|`false`|开启高级搜索|N|
|advanced-search-title|`string`|`高级搜索`|高级搜索标题|N|
|search-reset-text|`string`|`重置`|高级搜索重置按钮文字|N|
|search-confirm-text|`string`|`确定`|高级搜索确认按钮文字|N|
|form-props|`FormProps`|-|表单组件 props|N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:model-value|输入内容发生改变时触发|value: string(当前输入内容)|
|blur|输入框失焦时触发|value: string, event: Event|
|focus|输入框聚焦时触发|value: string, event: Event|
|clear|清空内容按钮点击时触发|value: string, event: Event|
|confirm|高级搜索确认事件|value: Record<string, unknown>|
|quick-search|快捷搜索事件|value: string|
|reset|高级搜索重置事件|-|

### TypeScript 类型

```typescript
import type { SearchProps } from '@xuanmo/dl-ui'
```
