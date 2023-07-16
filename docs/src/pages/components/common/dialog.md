---
columns: 2
---
# Dialog 对话框

执行操作前二次确认。

## 引入

```typescript
import { createApp } from 'vue';
import { DDialog } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DDialog)
```

## 代码演示

```vue title=基础用法
<template>
  <d-button @click="visible = true">显示对话框</d-button>
  <d-dialog v-model:visible="visible" title="标题">
    对话框内容
  </d-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

```vue title=显示主题
<template>
  <markdown>
    设置 `show-icon` 为 `true`，即可显示图标
  </markdown>
  <d-space :gap="4">
    <d-button @click="visible1 = true" theme="primary">提示反馈</d-button>
    <d-dialog v-model:visible="visible1" show-icon theme="info" title="标题">
      对话框内容
    </d-dialog>

    <d-button @click="visible2 = true" theme="success">成功反馈</d-button>
    <d-dialog v-model:visible="visible2" show-icon theme="success" title="标题">
      对话框内容
    </d-dialog>

    <d-button @click="visible3 = true" theme="warning">警告反馈</d-button>
    <d-dialog v-model:visible="visible3" show-icon theme="warning" title="标题">
      对话框内容
    </d-dialog>

    <d-button @click="visible4 = true" theme="danger">失败反馈</d-button>
    <d-dialog v-model:visible="visible4" show-icon theme="error" title="标题">
      对话框内容
    </d-dialog>

    <d-button @click="visible5 = true">自定义图标</d-button>
    <d-dialog v-model:visible="visible5" show-icon title="标题">
      <template #icon>
        <lock-outlined color="#f00" />
      </template>
      对话框内容
    </d-dialog>
  </d-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LockOutlined } from '@xuanmo/dl-icons'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
</script>
```

```vue title=隐藏遮罩层
<template>
  <d-button @click="visible = true">显示对话框</d-button>
  <d-dialog 
    v-model:visible="visible" 
    title="标题" 
    :show-overlay="false" 
    :close-on-overlay-click="false"
  >
    对话框内容
  </d-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## API

### Dialog Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|v-mode:visible|`boolean`|-|对话框显示隐藏|Y|
|title|`string`|`提示`|对话框标题|N|
|content|`string`|-|对话框内容|N|
|closable|`boolean`|`true`|是否显示关闭图标|N|
|close-on-esc|`boolean`|`true`|按下 `esc` 是否关闭对话框|N|
|close-on-overlay-click|`boolean`|`true`|点击遮罩层是否关闭对话框|N|
|show-overlay|`boolean`|`true`|是否显示遮罩层|N|
|show-icon|`boolean`|`false`|是否显示图标|N|
|theme|`'info' \| 'success' \| 'warning' \| 'error'`|-|显示主题|N|
|cancel-button-text|`string`|`取消`|取消按钮文字|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|
|destroy-on-close|`boolean`|`false`|是否关闭对话框销毁子元素|N|
|width|`'number' \| 'string'`|`480px`|对话框宽度|N|
|height|`'number' \| 'string'`|-|对话框高度|N|
|top|`'number' \| 'string'`|-|对话框距离顶部距离|N|
|teleport|`TeleportProps['to']`|`body`|选择要插入的 DOM 节点，同 `Teleport` 组件，[参考链接](https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage) |N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:visible|显示隐藏事件|(value: boolean) => void|
|confirm|确认事件|() => void|
|cancel|取消事件|() => void|

### Slots

|名称|说明|
|---|----|
|default|对话框内容|
|icon|自定义图标|
|footer|自定义底部|

### TS 类型

```typescript
import { DialogProps } from '@xuanmo/dl-common'
```
