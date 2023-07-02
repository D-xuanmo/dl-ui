# Overlay 遮罩层

可以在页面添加一层遮罩层，一般用于弹框的背景。

## 引入

```typescript
import { createApp } from 'vue';
import { DOverlay } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DOverlay)
```

## 代码演示

```vue playground=Overlay title=基础用法
<template>
  <d-space :gap='10'>
    <d-button @click='visible = !visible'>打开遮罩层</d-button>
    <d-button @click='visible2 = !visible2'>修改过渡时间</d-button>
  </d-space>
  <d-overlay v-model:visible="visible" />
  <d-overlay v-model:visible="visible2" duration="1s" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|v-model:visible|`boolean`|`false`|控制遮罩层显示隐藏|Y|
|z-index|`number`|`2000`|CSS z-index|N|
|duration|`string \| number`|`0.3s`|背景过渡时间|N|
|overlay-class|`string`|-|背景过渡时间|N|
|overlay-style|`CSSProperties`|-|自定义 CSS|N|
|teleport|`TeleportProps['to']`|`body`|选择要插入的 DOM 节点，同`Teleport`组件，[参考链接](https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage)|N|
|close-on-click-overlay|`boolean`|`true`|点击遮罩层是否关闭弹出层|N|

### Events

|事件|说明|回调参数|
|----|---|-------|
|click|遮罩层点击事件|-|

## TypeScript 类型

```typescript
import type { OverlayProps } from '@xuanmo/dl-ui'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-overlay-bg-color|rgba(0, 0, 0, 0.7)|遮罩层背景色|
