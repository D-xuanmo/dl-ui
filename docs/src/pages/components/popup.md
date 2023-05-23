# Popup 弹出层

用于弹框选择数据、弹框提示等场景

```vue client=Mobile playground=MPopup previewType=iframe
<template>
  <d-cell-group round title="基础用法">
    <d-cell title="基础弹框" arrow @click="handleShowPopup" />
    <d-popup v-model:visible="showPopup"> 我是内容 </d-popup>
  </d-cell-group>

  <d-cell-group round title="弹出位置">
    <d-cell title="顶部弹出" content="placement: top" arrow @click="handleShowPopup2('top')" />
    <d-cell
      title="底部弹出"
      content="placement: bottom"
      arrow
      @click="handleShowPopup2('bottom')"
    />
    <d-cell title="左侧弹出" content="placement: left" arrow @click="handleShowPopup2('left')" />
    <d-cell title="右侧弹出" content="placement: right" arrow @click="handleShowPopup2('right')" />
    <d-popup v-model:visible="showPopup2" :placement="placement" />
  </d-cell-group>

  <d-cell-group round title="其他设置">
    <d-cell title="圆角显示" arrow @click="handleShowPopup3" />
    <d-cell title="显示标题" arrow @click="handleShowPopup4" />
    <d-popup v-model:visible="showPopup3" placement="bottom" round />
    <d-popup
      v-model:visible="showPopup4"
      title="我是标题我是标题我是标题我是标题我是标题我是标题"
      placement="bottom"
      round
      closeable
      :popup-style="{ height: '50%' }"
    >
      我是内容
    </d-popup>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlacementType } from '../../common'

const showPopup = ref(false)
const showPopup2 = ref(false)
const showPopup3 = ref(false)
const showPopup4 = ref(false)
const placement = ref<PlacementType>('top')

function handleShowPopup() {
  showPopup.value = true
}

function handleShowPopup2(p: PlacementType) {
  placement.value = p
  showPopup2.value = true
}

function handleShowPopup3() {
  showPopup3.value = true
}

function handleShowPopup4() {
  showPopup4.value = true
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
|round|`boolean`|`false`|实现显示未圆角，`placement`不等于`center`有效|N|
|closeable|`boolean`|`false`|是否显示关闭图标|N|
|popup-class|`string`|-|弹出层 className|N|
|popup-body-class|`string`|-|弹出层主体 className|N|
|popup-style|`CSSProperties`|-|弹出层style|N|
|overlay|`boolean`|`true`|是否显示遮罩层|N|
|overlay-class|`string`|-|遮罩层 className|N|
|overlay-style|`CSSProperties`|-|遮罩层 style|N|
|close-on-click-overlay|`boolean`|`true`|点击遮罩层是否关闭弹出层|N|
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
