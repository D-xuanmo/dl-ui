# Input 输入框

用于文本类数据录入操作。

## 引入

```typescript
import { createApp } from 'vue';
import { DInput } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DInput)
```

## 代码演示

```vue client=Mobile playground=MInput
<template>
  <d-cell-group title="基础用法">
    <d-cell title="输入框">
      <d-input v-model="value" placeholder="请输入文字" @blur="onBlur" />
    </d-cell>
    <d-cell>
      <d-input v-model="value" placeholder="无标题显示" hide-label />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="禁用、只读状态">
    <d-cell title="输入框禁用">
      <d-input v-model="value" placeholder="请输入文字" readonly />
    </d-cell>
    <d-cell title="输入框禁用">
      <d-input v-model="value" placeholder="请输入文字" disabled />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="字数限制">
    <d-cell title="输入框">
      <d-input v-model="value" placeholder="请输入文字" :maxlength="10" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="扩展类型">
    <d-cell title="密码">
      <d-input placeholder="请输入密码" type="password" />
    </d-cell>
    <d-cell title="数字输入框">
      <d-input v-model="number" placeholder="请输入密码" type="number" />
    </d-cell>
    <d-cell title="邮箱">
      <d-input v-model="value" placeholder="请输入邮箱" type="email" />
    </d-cell>
    <d-cell title="单价" suffix="元">
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="单价" suffix="元">
      <d-input v-model="value" placeholder="请输入文字">
        <template #suffix>slot 形式</template>
      </d-input>
    </d-cell>
  </d-cell-group>
  <d-cell-group title="其他设置">
    <d-cell title="显示冒号" colon>
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="可被清除">
      <d-input v-model="value" placeholder="请输入文字" clearable />
    </d-cell>
    <d-cell title="显示图标">
      <template #left-icon>
        <tips-outlined color="#f00" size="small" />
      </template>
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="超长文字展示" label-align="right">
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { TipsOutlined } from '@xuanmo/dl-icons'

  const value = ref('')
  const number = ref('')

  function onBlur(value: string) {
    console.log(value)
  }
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`string`|-|输入值|N|
|type|`string`|text|输入框类型，可选值：`text/number/password/email/url`|N|
|name|`string`|-|input 原生属性|N|
|placeholder|`string`|-|输入框占位符|N|
|disabled|`boolean`|-|是否禁用|N|
|readonly|`boolean`|-|是否只读|N|
|autofocus|`boolean`|-|自动聚焦，原生属性|N|
|input-align|`string`|-|输入框文字对齐方式，可选值：`left/center/right`|N|
|maxlength|`number`|-|最大长度，原生属性|N|
|suffix|`string`|-|右侧扩展内容|N|
|autocomplete|`string`|-|原生属性，[MDN-autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)|N|
|clearable|`boolean`|-|显示可清空按钮|N|
|formatter|`(value: string) => string`|-|格式化函数|N|
|formatter-trigger|`string`|`onChange`|格式化函数触发时机，可选值：`onBlur`|N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:model-value|输入内容发生改变时触发|value: string(当前输入内容)|
|blur|输入框失焦时触发|value: string, event: Event|
|focus|输入框聚焦时触发|value: string, event: Event|
|clear|清空内容按钮点击时触发|value: string, event: Event|
|click-input|输入框点击时触发|value: string, event: Event|


### TypeScript 类型

```typescript
import type { InputProps } from '@xuanmo/dl-ui'
```
