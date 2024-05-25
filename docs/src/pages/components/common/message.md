---
columns: 2
---

# Message 消息提示

页面顶部展示一段消息提示。

## 引入

```typescript
import { createApp } from 'vue';
import { DMessage } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DMessage)
```

## 代码演示

```vue client=PC playground=Message title=基础
<template>
  <d-space :gap="10">
    <d-button fill="outline" theme="primary" @click="showInfo">info</d-button>
    <d-button fill="outline" theme="success" @click="showSuccess">success</d-button>
    <d-button fill="outline" theme="warning" @click="showWarning">warning</d-button>
    <d-button fill="outline" theme="danger" @click="showError">error</d-button>
    <d-button fill="outline" @click="showLoading">loading</d-button>
  </d-space>
</template>

<script setup lang="ts">
import { useMessage } from '@xuanmo/dl-common'
const message = useMessage()
const showInfo = () => message.info('消息内容')
const showSuccess = () => message.success('成功消息内容')
const showWarning = () => message.warning('警告消息内容')
const showError = () => message.error('消息内容')
const showLoading = () => message.loading('加载中...')
</script>
```

```vue client=PC playground=1mueg9f title=手动开启、关闭

<template>
  <markdown>
    将 `duration` 设置为 `0`，则代表不自动关闭。
  </markdown>
  <d-space :gap='10'>
    <d-button fill='outline' @click='manual'>打开</d-button>
    <d-button fill='outline' @click='messageInstance?.destroy()'>关闭</d-button>
  </d-space>
</template>

<script setup lang='ts'>
import { useMessage, MessageInstance } from '@xuanmo/dl-common'
const message = useMessage()
let messageInstance: MessageInstance | null = null
const manual = () => {
  messageInstance = message.info('我不会自动关闭', {
    duration: 0
  })
}
</script>
```

```vue client=PC playground=hohu45 title=不显示图标
<template>
  <d-button fill="outline" @click="showInfo">打开</d-button>
</template>

<script setup lang="ts">
import { useMessage } from '@xuanmo/dl-common'
const message = useMessage()
const showInfo = () => message.text('消息内容')
</script>
```

```vue client=PC playground=3mfcvm8 title=显示关闭
<template>
  <d-button fill="outline" @click="showInfo">打开</d-button>
</template>

<script setup lang="ts">
import { useMessage } from '@xuanmo/dl-common'
const message = useMessage()
const showInfo = () => message.info('消息内容', {
  closable: true,
  duration: 5000
})
</script>
```

```vue client=PC playground=13c1qbo title=关闭所有消息
<template>
  <markdown>
    调用 `destroyAll` 可关闭页面所有 `message` 实例。
  </markdown>
  <d-button fill="outline" @click="message.destroyAll">close all</d-button>
</template>

<script setup lang="ts">
  import { useMessage } from '@xuanmo/dl-common'
  const message = useMessage()
</script>
```

## API

### Message Option

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|closable|`boolean`|-|是否显示关闭图标|N|
|duration|`number`|`2000`|消息提示时间，单位毫秒|N|

### Message Plugin

|名称|类型|说明|
|---|----|---|
|text|`(content: string, option?: MessageOption) => MessageInstance`|展示无图标信息|
|info|`(content: string, option?: MessageOption) => MessageInstance`|调用 `info` 类型信息|
|success|`(content: string, option?: MessageOption) => MessageInstance`|调用 `success` 类型信息|
|warning|`(content: string, option?: MessageOption) => MessageInstance`|调用 `warning` 类型信息|
|error|`(content: string, option?: MessageOption) => MessageInstance`|调用 `error` 类型信息|
|loading|`(content: string, option?: MessageOption) => MessageInstance`|调用 `loading` 类型信息|
|destroyAll|`() => void`|销毁页面所有 message 实例|


### TS 类型

```typescript
/**
 * 消息实例对象
 */
type MessageInstance = {
  open: () => void
  destroy: () => void
}

import type {
  MessageProps,
  MessageInstance
} from '@xuanmo/dl-common'
```
