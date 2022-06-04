# Overlay 遮罩层

```vue preview type=h5
<template>
  <DCell title="打开遮罩层">
    <DSwitch v-model="visible"></DSwitch>
    <DOverlay v-model:visible="visible" />
  </DCell>
  <DCell
    title="修改过渡时间"
    title-width="100px"
  >
    <DSwitch v-model="visible2"></DSwitch>
    <DOverlay
      v-model:visible="visible2"
      duration="1s"
    />
  </DCell>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>
```

## API

### Props

| 参数            | 类型               | 默认值 | 说明               | 必传 |
| --------------- | ------------------ | ------ | ------------------ | ---- |
| v-model:visible | `boolean`          | false  | 控制遮罩层显示隐藏 | Y    |
| z-index         | `number`           | 2000   | CSS z-index        | N    |
| duration        | `string \| number` | 0.3s   | 背景过渡时间       | N    |
| overlay-class   | `string`           | -      | 背景过渡时间       | N    |
| overlay-style   | `CSSProperties`    | -      | 自定义 CSS         | N    |

### Events

| 事件              | 说明           | 回调参数         |
| ----------------- | -------------- | ---------------- |
| update:modelValue | 显示隐藏事件   | `value: boolean` |
| click             | 遮罩层点击事件 | -                |
