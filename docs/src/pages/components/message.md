# Message 消息提示

页面顶部展示一段消息提示

```vue client=Mobile
<template>
  <dl-demo-block title="基础用法">
    <d-space :gap="10" direction="vertical">
      <d-button block @click="handleShowMessageFC()">文字信息</d-button>
      <d-button block @click="handleShowMessage2">带关闭按钮</d-button>
      <d-button block @click="handleShowLoadingMessage">显示 loading</d-button>
    </d-space>
  </dl-demo-block>
  <dl-demo-block title="显示主题">
    <d-space :gap="10" direction="vertical">
      <d-button block fill="outline" theme="default" @click="handleShowMessageFC('info')">
        普通信息
      </d-button>
      <d-button block fill="outline" theme="success" @click="handleShowMessageFC('success')">
        成功信息
      </d-button>
      <d-button block fill="outline" theme="warning" @click="handleShowMessageFC('warning')">
        警告信息
      </d-button>
      <d-button block fill="outline" theme="danger" @click="handleShowMessageFC('error')">
        错误信息
      </d-button>
    </d-space>
  </dl-demo-block>
  <dl-demo-block title="手动关闭">
    <d-space :gap="10">
      <d-button block fill="outline" theme="default" @click="handleShowMessage">
        打开消息
      </d-button>
      <d-button block fill="outline" theme="default" @click="handleCloseMessage">
        关闭消息
      </d-button>
    </d-space>
  </dl-demo-block>
</template>

<script setup lang="ts">
import { showMessage } from '@xuanmo/dl-ui'
import { MessageType } from '@xuanmo/dl-common'

let messageInstance = null

const handleShowMessage = () => {
  messageInstance = showMessage({
    content: '我是一段不会自动关闭的消息',
    // 设置为 0，不自动关闭
    duration: 0
  })
}

const handleCloseMessage = () => messageInstance?.destroy()

const handleShowMessage2 = () => {
  showMessage({
    content: '带关闭的消息',
    // 设置为 0，不自动关闭
    duration: 5000,
    closeable: true
  })
}

const handleShowLoadingMessage = () => {
  const { destroy } = showMessage({
    content: '加载中...',
    duration: 0,
    type: 'loading'
  })
  setTimeout(destroy, 3000)
}

const handleShowMessageFC = (theme?: MessageType) => {
  showMessage({
    content: '函数调用模式',
    theme
  })
}
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|visible|`boolean`|`false`|消息展示状态|N|
|content|`string`|-|消息内容|Y|
|content|`string`|-|消息内容|N|
|type|`'text' \| 'loading'`|`text`|消息类型，默认文本|N|
|theme|`MessageType`|-|消息主题|N|
|closeable|`boolean`|-|是否显示关闭图标|N|
|duration|`number`|`1500`|消息提示时间，单位毫秒|N|

### 函数调用

```typescript
import { showMessage } from '@xuanmo/dl-ui'

showMessage({
  content: '消息内容'
})
```

### TypesScript 类型

```typescript
/** 消息类型 */
type MessageType = 'info' | 'success' | 'warning' | 'error'

/**
 * 消息实例对象
 */
type MessageInstance = {
  open: () => void
  destroy: () => void
}

import type {
  showMessage,
  closeAllMessage,
  MessageProps,
  MessageInstance
} from '@xuanmo/dl-ui'
```
