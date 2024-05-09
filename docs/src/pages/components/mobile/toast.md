# Toast 轻提示

用于页面加载提示、消息通知等场景，在页面中间区域以半透明黑色显示，不会阻止操作。

## 引入

```typescript
import { createApp } from 'vue';
import { DToast } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DToast)
```

## 代码演示

```vue client=Mobile previewType=iframe
<template>
  <d-space :gap="10" direction="vertical">
    <d-button block theme="primary" fill="outline" @click="visible1 = true">纯文本内容</d-button>
    <d-button block theme="primary" fill="outline" @click="visible2 = true">成功状态</d-button>
    <d-button block theme="primary" fill="outline" @click="visible3 = true">失败状态</d-button>
    <d-button block theme="primary" fill="outline" @click="visible4 = true">加载中状态</d-button>
    <d-button block theme="primary" fill="outline" @click="show('文本内容')">函数调用</d-button>
  </d-space>
  <d-toast v-model:visible="visible1">显示内容</d-toast>
  <d-toast v-model:visible="visible2" theme="success">保存成功</d-toast>
  <d-toast v-model:visible="visible3" theme="error">保存失败</d-toast>
  <d-toast v-model:visible="visible4" theme="loading">加载中...</d-toast>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@xuanmo/dl-ui'

const toast = useToast()

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)

const show = (text: string) => {
  toast.loading(text)
}
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|visible/v-model|`boolean`|-|显示状态|Y|
|duration|`number`|`2000`|消息提示时间，单位毫秒|N|
|direction|`DirectionType`|`horizontal`|排列方式|N|

### Toast Plugin

|名称|类型|说明|
|---|----|---|
|text|`(content: string, option?: ToastOption) => ToastInstance`|展示无图标信息|
|success|`(content: string, option?: ToastOption) => ToastInstance`|调用 `success` 类型信息|
|error|`(content: string, option?: ToastOption) => ToastInstance`|调用 `error` 类型信息|
|loading|`(content: string, option?: ToastOption) => ToastInstance`|调用 `loading` 类型信息|
|destroyAll|`() => void`|销毁页面所有 toast 实例|

### TypeScript 类型

```typescript
import type { ToastProps, ToastInstance } from '@xuanmo/dl-ui'
```

### CSS 变量
|变量名|默认值|描述|
|-----|-----|----|
|--d-toast-bg-color|`rgba(0, 0, 0, 0.9)`|提示背景颜色|
|--d-toast-radius|`var(--d-radius-medium)`|提示圆角大小|
|--d-toast-max-width|`80%`|提示容器宽度|
