# Overlay 遮罩层

可以在页面添加一层遮罩层，一般用于弹框的背景。

```vue client=Mobile playground=MOverlay
<template>
  <d-cell title="打开遮罩层" content-align="right">
    <d-switch v-model="visible" />
    <d-overlay v-model:visible="visible" />
  </d-cell>
  <d-cell title="修改过渡时间" title-width="100px" content-align="right">
    <d-switch v-model="visible2" />
    <d-overlay v-model:visible="visible2" duration="1s" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>
```

## API

### Props

| 参数                   | 类型                  | 默认值 | 说明                                                                                                                          | 必传 |
| ---------------------- | --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- | ---- |
| v-model:visible        | `boolean`             | false  | 控制遮罩层显示隐藏                                                                                                            | Y    |
| z-index                | `number`              | 2000   | CSS z-index                                                                                                                   | N    |
| duration               | `string \| number`    | 0.3s   | 背景过渡时间                                                                                                                  | N    |
| overlay-class          | `string`              | -      | 背景过渡时间                                                                                                                  | N    |
| overlay-style          | `CSSProperties`       | -      | 自定义 CSS                                                                                                                    | N    |
| teleport               | `TeleportProps['to']` | body   | 选择要插入的 DOM 节点，同 `Teleport` 组件，[参考链接](https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage) | N    |
| close-on-click-overlay | `boolean`             | true   | 点击遮罩层是否关闭弹出层                                                                                                      | N    |

### Events

| 事件              | 说明           | 回调参数         |
| ----------------- | -------------- | ---------------- |
| update:modelValue | 显示隐藏事件   | `value: boolean` |
| click             | 遮罩层点击事件 | -                |
