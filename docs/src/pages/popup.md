# Popup 弹出层

## 基础用法

默认居中显示

```vue
<template>
  <d-cell-group
    round
    title="基础用法"
  >
    <d-cell
      title="基础弹框"
      arrow
      @click="handleShowPopup"
    ></d-cell>
  </d-cell-group>
  <d-popup v-model:visible="showPopup"> 我是内容 </d-popup>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'

const showPopup = ref(false)

function handleShowPopup() {
  showPopup.value = true
}
</script>
```

## 不同方向使用

```vue
<template>
  <d-cell-group
    round
    title="弹出位置"
  >
    <d-cell
      title="顶部弹出"
      content="position: top"
      arrow
      @click="handleShowPopup('top')"
    />
    <d-cell
      title="底部弹出"
      content="position: bottom"
      arrow
      @click="handleShowPopup('bottom')"
    />
    <d-cell
      title="左侧弹出"
      content="position: left"
      arrow
      @click="handleShowPopup('left')"
    />
    <d-cell
      title="右侧弹出"
      content="position: right"
      arrow
      @click="handleShowPopup('right')"
    />
  </d-cell-group>
  <d-popup
    v-model:visible="showPopup2"
    :position="position"
  />
</template>
<script
  lang="ts"
  setup
>
import { ref } from 'vue'

const showPopup = ref(false)
const position = ref('top')

function handleShowPopup(p) {
  position.value = p
  showPopup.value = true
}
</script>
```

## API

### Props

| 参数                   | 类型            | 默认值  | 说明                                                                   | 必传 |
| ---------------------- | --------------- | ------- | ---------------------------------------------------------------------- | ---- |
| v-model:visible        | `boolean`       | false   | 控制显示与隐藏                                                         | N    |
| title                  | `string`        | -       | 弹出层标题，`placement` 不等于 `center` 有效                           | N    |
| placement              | `PositionType`  | center  | 弹出层位置，可选值`'top' \| 'right' \| 'bottom' \| 'left' \| 'center'` | N    |
| z-index                | `number`        | 2000    | CSS z-index                                                            | N    |
| duration               | `number`        | 0.3     | 过渡动画时间                                                           | N    |
| round                  | `boolean`       | false   | 实现显示未圆角，`placement` 不等于 `center` 有效                       | N    |
| closeable              | `boolean`       | false   | 是否显示关闭图标                                                       | N    |
| close-icon             | `string`        | close-o | 同 `Icon` 组件 `name` 属性                                             | N    |
| popup-class            | `string`        | -       | 弹出层 class                                                           | N    |
| popup-style            | `CSSProperties` | -       | 弹出层 style                                                           | N    |
| overlay                | `boolean`       | true    | 是否显示遮罩层                                                         | N    |
| overlay-class          | `string`        | -       | 遮罩层 class                                                           | N    |
| overlay-style          | `CSSProperties` | -       | 遮罩层 style                                                           | N    |
| close-on-click-overlay | `boolean`       | true    | 点击遮罩层是否关闭弹出层                                               | N    |

### Events

| 事件               | 说明                   | 回调参数         |
| ------------------ | ---------------------- | ---------------- |
| update:visible     | 显示隐藏事件           | `value: boolean` |
| open               | 组件展示时触发         | -                |
| opened             | 组件动画完成时触发     | -                |
| close              | 组件关闭时触发         | -                |
| closed             | 组件关闭动画完成时触发 | -                |
| click-overlay-icon | 关闭按钮点击时触发     | -                |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 弹出层内容 |
