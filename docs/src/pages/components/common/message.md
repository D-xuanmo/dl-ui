---
columns: 2
---

# Message 消息提示

页面顶部展示一段消息提示。

## 引入

```typescript
import { message } from '@xuanmo/dl-common'
```

## 代码演示

```vue client=PC playground=Message title=基础
<template>
  <d-space :gap="10">
    <d-button fill="outline" @click="showInfo">info</d-button>
    <d-button fill="outline" @click="showSuccess">success</d-button>
    <d-button fill="outline" @click="showWarning">warning</d-button>
    <d-button fill="outline" @click="showError">error</d-button>
    <d-button fill="outline" @click="showLoading">loading</d-button>
  </d-space>
</template>

<script setup lang="ts">
import { message } from '@xuanmo/dl-ui'
const showInfo = () => message.info('消息内容')
const showSuccess = () => message.success('成功消息内容')
const showWarning = () => message.warning('警告消息内容')
const showError = () => message.error('消息内容')
const showLoading = () => message.loading('加载中...')
</script>
```

```vue client=PC playground=Message title=手动开启、关闭

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
import { message, MessageInstance } from '@xuanmo/dl-ui'
let messageInstance: MessageInstance | null = null
const manual = () => {
  messageInstance = message.info('我不会自动关闭', {
    duration: 0
  })
}
</script>
```

```vue client=PC playground=Message title=不显示图标
<template>
  <d-button fill="outline" @click="showInfo">打开</d-button>
</template>

<script setup lang="ts">
import { message } from '@xuanmo/dl-ui'
const showInfo = () => message.text('消息内容')
</script>
```

```vue client=PC playground=Message title=显示关闭
<template>
  <d-button fill="outline" @click="showInfo">打开</d-button>
</template>

<script setup lang="ts">
import { message } from '@xuanmo/dl-ui'
const showInfo = () => message.info('消息内容', {
  closeable: true,
  duration: 5000
})
</script>
```

```vue client=PC playground=Message title=关闭所有消息
<template>
  <markdown>
    调用 `destroyAll` 可关闭页面所有 `message` 实例。
  </markdown>
  <d-button fill="outline" @click="message.destroyAll">close all</d-button>
</template>

<script setup lang="ts">
import { message } from '@xuanmo/dl-ui'
</script>
```

## API

### Message Option

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|closeable|`boolean`|-|是否显示关闭图标|N|
|duration|`number`|`2000`|消息提示时间，单位毫秒|N|

### Message Methods

|名称|类型|说明|
|---|----|---|
|text|`(content: string, option?: MessageOption) => MessageInstance`|展示无图标信息|
|info|`(content: string, option?: MessageOption) => MessageInstance`|调用 `info` 类型信息|
|success|`(content: string, option?: MessageOption) => MessageInstance`|调用 `success` 类型信息|
|warning|`(content: string, option?: MessageOption) => MessageInstance`|调用 `warning` 类型信息|
|error|`(content: string, option?: MessageOption) => MessageInstance`|调用 `error` 类型信息|
|loading|`(content: string, option?: MessageOption) => MessageInstance`|调用 `loading` 类型信息|
|destroyAll|`() => void`|销毁页面所有 message 实例|


### TypeScript 类型

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
