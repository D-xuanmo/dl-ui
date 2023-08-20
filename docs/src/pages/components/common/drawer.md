---
columns: 2
---

# Drawer 抽屉

侧滑的形式打开弹出层。

## 引入

```typescript
import { createApp } from 'vue';
import { DDrawer } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DDrawer)
```

## 代码演示

```vue title=基础用法
<template>
  <d-button @click="visible = true">显示抽屉</d-button>
  <d-drawer v-model:visible="visible" title="标题">
    内容
  </d-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

```vue title=超出滚动
<template>
  <d-button @click="visible = true">显示抽屉</d-button>
  <d-drawer v-model:visible="visible" title="标题">
    <p v-for="i in 100" :key="i">内容滚动</p>
  </d-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

```vue title=嵌套使用
<template>
  <d-button @click="visible1 = true">显示抽屉</d-button>
  <d-drawer
    v-model:visible="visible1"
    title="标题"
    :width="600"
    @confirm="showMessage"
    @close="showCloseMessage"
  >
    <d-button theme="primary" @click="visible2 = true">打开下一个</d-button>
    <d-drawer
      v-model:visible="visible2"
      title="标题"
      :width="300"
      :footer="false"
      @confirm="showMessage"
      @close="showCloseMessage"
    >
      <d-button theme="primary" @click="visible3 = true">打开对话框</d-button>
      <d-dialog v-model:visible="visible3">对话框内容</d-dialog>
    </d-drawer>
  </d-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from '@xuanmo/dl-common'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)

const showMessage = () => {
  MessagePlugin.success('onConfirm')
}

const showCloseMessage = () => {
  MessagePlugin.info('onClose')
}
</script>
```

```vue title=切换位置
<template>
  <d-space :gap="8">
    <d-button @click="showDrawer('top')">上</d-button>
    <d-button @click="showDrawer('right')">右</d-button>
    <d-button @click="showDrawer('bottom')">下</d-button>
    <d-button @click="showDrawer('left')">左</d-button>
  </d-space>
  <d-drawer
    v-model:visible="visible"
    title="标题"
    :placement="placement"
    :footer="false"
  >
    我是内容
  </d-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const placement = ref('right')

const showDrawer = (p: string) => {
  placement.value = p
  visible.value = true
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
|lock-scroll|`boolean`|`true`|是否显示时，锁定 body 滚动|N|
|closable|`boolean`|`true`|是否显示关闭图标|N|
|close-on-esc|`boolean`|`true`|按下 `esc` 是否关闭对话框|N|
|close-on-overlay-click|`boolean`|`true`|点击遮罩层是否关闭对话框|N|
|show-overlay|`boolean`|`true`|是否显示遮罩层|N|
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
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`right`|抽屉打开位置|N|
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
|footer|自定义底部|

### TS 类型

```typescript
import { DrawerProps } from '@xuanmo/dl-common'
