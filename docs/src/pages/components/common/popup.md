---
columns: 2
---

# Popup 弹出层

用于弹框选择数据、弹框提示等场景。

## 引入

```typescript
import { createApp } from 'vue';
import { DPopup } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DPopup)
```

## 代码演示

```vue playground=2vujmjd title=基础用法
<template>
  <d-button @click='showPopup = true'>打开</d-button>
  <d-popup v-model:visible="showPopup"> 我是内容 </d-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopup = ref(false)
</script>
```

```vue playground=2pfsnni title=弹出位置
<template>
  <markdown>
    通过设置 `placement` 可改变弹出位置，值分别为：`top`、`bottom`、`left`、`right`。
  </markdown>
  <d-space :gap='10'>
    <d-button @click="handleShowPopup('top')">top</d-button>
    <d-button @click="handleShowPopup('bottom')">bottom</d-button>
    <d-button @click="handleShowPopup('left')">left</d-button>
    <d-button @click="handleShowPopup('right')">right</d-button>
  </d-space>
  <d-popup v-model:visible="showPopup" :placement="placement">
    <div style='height: 100px'>{{ placement }}</div>
  </d-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlacementEnum } from '@xuanmo/dl-ui'

const showPopup = ref(false)
const placement = ref('top')

function handleShowPopup(p: PlacementEnum) {
  placement.value = p
  showPopup.value = true
}
</script>
```

```vue playground=326846 title=其他设置
<template>
  <markdown>此模式一般用于移动端。</markdown>
  <d-space :gap='10'>
    <d-button @click="handleShowPopup1('top')">圆角显示</d-button>
    <d-button @click="handleShowPopup2('bottom')">显示标题</d-button>
  </d-space>
  <d-popup v-model:visible="showPopup1" placement="bottom" round>
    <div style='height: 200px'>我是内容</div>
  </d-popup>
  <d-popup
    v-model:visible="showPopup2"
    title="标题"
    placement="bottom"
    round
    closable
    :popup-style="{ height: '50%' }"
  >
    我是内容
  </d-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopup1 = ref(false)
const showPopup2 = ref(false)

function handleShowPopup1() {
  showPopup1.value = true
}

function handleShowPopup2() {
  showPopup2.value = true
}
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|----|---|-----|---|----|
|v-model:visible|`boolean`|`false`|控制显示与隐藏|Y|
|title|`string`|-|弹出层标题，`placement` 不等于 `center` 有效|N|
|placement|`PositionType`|`center`|弹出层位置，可选值`'top' \| 'right' \| 'bottom' \| 'left' \| 'center'`|N|
|z-index|`number`|`2000`|CSS z-index|N|
|duration|`number`|`0.3`|过渡动画时间|N|
|lock-scroll|`boolean`|`true`|是否显示时，锁定 body 滚动|N|
|round|`boolean`|`false`|实现显示未圆角，`placement`不等于`center`有效|N|
|closable|`boolean`|`false`|是否显示关闭图标|N|
|popup-container-class|`string`|-|弹出层容器 className|N|
|popup-class|`string`|-|弹出层 className|N|
|popup-header-class|`string`|-|弹出层头部 className|N|
|popup-body-class|`string`|-|弹出层主体 className|N|
|popup-style|`CSSProperties`|-|弹出层style|N|
|overlay|`boolean`|`true`|是否显示遮罩层|N|
|overlay-class|`string`|-|遮罩层 className|N|
|overlay-style|`CSSProperties`|-|遮罩层 style|N|
|close-on-overlay-click|`boolean`|`true`|点击遮罩层是否关闭弹出层|N|
|lazy-render|`boolean`|`true`|是否显示弹出层时渲染内容，内容较多时，建议开启，以保证页面渲染性能|N|
|teleport|`TeleportProps['to']`|`body`|选择要插入的 DOM 节点，同 `Teleport` 组件，[参考链接](https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage) |N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:visible|显示隐藏事件|(value: boolean) => void|
|open|组件展示时触发|-|
|opened|组件动画完成时触发|-|
|close|组件关闭时触发|-|
|closed|组件关闭动画完成时触发|-|
|click-overlay-icon|关闭按钮点击时触发|-|

### Slots

|名称|说明|
|---|----|
|default|弹出层内容|
|header-left|头部左侧内容|
|header-right|头部右侧内容|
|close-icon|关闭图标|

## TypeScript 类型

```typescript
import type { PopupProps } from '@xuanmo/dl-ui'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-popup-header-gap-bottom|var(--d-gap-xs)|头部下外边距|
|--d-popup-padding|var(--d-gap-sm)|内边距|
|--d-popup-radius|var(--d-radius-large)|圆角大小|
|--d-popup-title-font-size|var(--d-font-size-md)|头部标题文字大小|
