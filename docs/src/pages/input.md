# Input 输入框

```vue client=Mobile playground=MInput
<template>
  <d-cell-group title="基础用法">
    <d-input v-model="value" label="输入框" placeholder="请输入文字" @blur="onBlur" />
    <d-input v-model="value" placeholder="无标题显示" hide-label />
  </d-cell-group>
  <d-cell-group title="禁用、只读状态">
    <d-input v-model="value" label="输入框禁用" placeholder="请输入文字" readonly />
    <d-input v-model="value" label="输入框禁用" placeholder="请输入文字" disabled />
  </d-cell-group>
  <d-cell-group title="字数限制">
    <d-input v-model="value" label="输入框" placeholder="请输入文字" :maxlength="10" />
  </d-cell-group>
  <d-cell-group title="扩展类型">
    <d-input label="密码" placeholder="请输入密码" type="password" />
    <d-input v-model="number" label="数字输入框" placeholder="请输入密码" type="number" />
    <d-input v-model="value" label="邮箱" placeholder="请输入邮箱" type="email" />
    <d-input v-model="value" label="单价" placeholder="请输入文字" suffix="元" />
    <d-input v-model="value" label="单价" placeholder="请输入文字" suffix="元">
      <template #suffix>slot 形式</template>
    </d-input>
  </d-cell-group>
  <d-cell-group title="其他设置">
    <d-input v-model="value" label="显示冒号" placeholder="请输入文字" colon />
    <d-input v-model="value" label="可被清除" placeholder="请输入文字" clearable />
    <d-input
      v-model="value"
      label="显示图标"
      placeholder="请输入文字"
      left-icon="tips-f"
      left-icon-color="#f00"
    />
    <d-input
      v-model="value"
      label="图标大小"
      placeholder="请输入文字"
      left-icon="tips-f"
      left-icon-color="#f00"
      left-icon-size="small"
    />
    <d-input v-model="value" label="超长文字展示" placeholder="请输入文字" label-align="right" />
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
|v-model|`string`|-|输入值|N|
|type|`string`|text|输入框类型，可选值：`text/number/password/email/url`|N|
|name|`string`|-|input 原生属性|N|
|label|`string`|-|左侧显示文字|N|
|label-class|`string`|-|左侧显示文字类名|N|
|label-width|`string`|-|左侧显示文字宽度，单位：`px`|N|
|label-align|`string`|left|左侧显示文字对齐方式，可选值：`left/center/right`|N|
|hide-label|`boolean`|false|隐藏左侧显示文字|N|
|left-icon|`string`|-|左侧图标名|N|
|left-icon-size|`string`|-|左侧图标大小，同 `Icon` 组件大小|N|
|left-icon-color|`string`|-|左侧图标颜色|N|
|colon|`boolean`|-|是否显示左侧冒号|N|
|required|`boolean`|-|是否必填|N|
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

|事件              | 说明                   | 回调参数                    |
| ----------------- | ---------------------- | --------------------------- |
| update:modelValue | 输入内容发生改变时触发 | value: string(当前输入内容) |
| blur              | 输入框失焦时触发       | value: string, event: Event |
| focus             | 输入框聚焦时触发       | value: string, event: Event |
| clear             | 清空内容按钮点击时触发 | value: string, event: Event |
| click-input       | 输入框点击时触发       | value: string, event: Event |

### Slots

| 名称   | 说明           |
| ------ | -------------- |
| suffix | 自定义扩展内容 |
