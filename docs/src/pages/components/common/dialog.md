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

```vue title=插件形式调用
<template>
  <d-space :gap='8'>
    <d-button @click="showDialog1">显示对话框</d-button>
    <d-button @click="showDialog2">显示图标</d-button>
    <d-button @click="showDialog3">alert</d-button>
  </d-space>
</template>

<script setup lang="ts">
import { DialogPlugin } from '@xuanmo/dl-common'

const showDialog1 = () => {
  DialogPlugin.confirm({
    title: '对话框标题',
    content: '对话框内容',
    onConfirm() {
      debugger
    }
  })
}
const showDialog2 = () => {
  DialogPlugin.confirm({
    title: '对话框标题',
    content: '对话框内容',
    showIcon: true
  })
}
const showDialog3 = () => {
  DialogPlugin.alert({
    title: '对话框标题',
    content: '对话框内容',
    showIcon: true
  })
}
</script>
```

```vue title=异步场景
<template>
  <d-space :gap='8'>
    <d-button @click="showDialog">显示对话框</d-button>
  </d-space>
</template>

<script setup lang="ts">
import { DialogPlugin, MessagePlugin } from '@xuanmo/dl-common'

const showDialog = () => {
  const dialog = DialogPlugin.confirm({
    content: '可以实现一些异步场景',
    onConfirm() {
      dialog.update({ loading: true })
      return new Promise((resolve) => {
        let count = 3
        dialog.update({ content: `倒计时${count}秒` })
        const timer = setInterval(() => {
          count--
          dialog.update({ content: `倒计时${count}秒` })
        }, 1000)
        setTimeout(() => {
          dialog.update({ loading: false })
          MessagePlugin.success('完成')
          clearInterval(timer)
          resolve(true)
        }, 3000)
      })
    }
  })
}
</script>
```

## API

### Dialog Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|v-mode:visible|`boolean`|-|对话框显示隐藏|Y|
|title|`string`|`提示`|对话框标题|N|
|content|`string`|-|对话框内容|N|
|loading|`boolean`|-|控制按钮 loading 状态|N|
|closable|`boolean`|`true`|是否显示关闭图标|N|
|close-on-esc|`boolean`|`true`|按下 `esc` 是否关闭对话框|N|
|close-on-overlay-click|`boolean`|`true`|点击遮罩层是否关闭对话框|N|
|show-overlay|`boolean`|`true`|是否显示遮罩层|N|
|show-icon|`boolean`|`false`|是否显示图标|N|
|theme|`'info' \| 'success' \| 'warning' \| 'error'`|-|显示主题|N|
|cancel-button-text|`string`|`取消`|取消按钮文字|N|
|cancel-button-props|`ButtonProps`|-|可复写按钮参数|N|
|hide-cancel-button|`boolean`|`false`|隐藏取消按钮|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|
|confirm-button-props|`ButtonProps`|-|可复写按钮参数|N|
|hide-confirm-button|`boolean`|`false`|隐藏确认按钮|N|
|footer|`boolean \| VNode[]`|-|类型为 `boolean` 时，控制底部显示隐藏，为 `VNode[]` 时，复写整个底部|N|
|destroy-on-close|`boolean`|`false`|是否关闭对话框销毁子元素|N|
|width|`'number' \| 'string'`|`480px`|对话框宽度|N|
|height|`'number' \| 'string'`|-|对话框高度|N|
|top|`'number' \| 'string'`|-|对话框距离顶部距离|N|
|placement|`'top' \| 'center'`|`top`|对话框位置，top 时，距离顶部默认 20%；center 时，垂直居中|N|
|teleport|`TeleportProps['to']`|`body`|选择要插入的 DOM 节点，同 `Teleport` 组件，[参考链接](https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage) |N|
|onClose|`() => void`|-|对话框关闭事件|N|
|onConfirm|`() => void \| Promise<boolean>`|-|对话框确认事件，返回 `Promise<false>` 则不会关闭弹框|N|

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

### Dialog Plugin

|名称|类型|说明|
|---|----|---|
|confirm|`(options: Omit<DialogProps, 'visible'>) => DialogInstance`|显示对话框|
|alert|`(options: Omit<DialogProps, 'visible'>) => DialogInstance`|显示确认框|

### TS 类型

```typescript
import { DialogProps, DialogInstance } from '@xuanmo/dl-common'
```
