# Rate 评分

```vue client=Mobile playground=MRate height=500
<template>
  <d-cell-group title="基础用法">
    <d-cell content-align="left">
      <d-rate v-model="value" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="图标修改">
    <d-cell content-align="left">
      <d-rate v-model="value" unchecked-icon="heart" checked-icon="heart-f" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="大小、颜色调整">
    <d-cell content-align="left">
      <d-rate v-model="value" active-color="#f00" :gap="8" size="large" />
      <d-rate v-model="value" active-color="#f00" :gap="8" size="30px" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="禁用">
    <d-cell content-align="left">
      <d-rate v-model="value" disabled />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(2)
</script>
```

## API

### Props

| 参数           | 类型                 | 默认值             | 说明                                     | 必传 |
| -------------- | -------------------- | ------------------ | ---------------------------------------- | ---- |
| v-model        | `number`             | -                  | 当前选中评分值                           | Y    |
| count          | `number`             | 5                  | 图标个数                                 | N    |
| size           | `SizeType \| string` | `medium`           | 图标大小                                 | N    |
| gap            | `number`             | 4                  | 图标间距                                 | N    |
| checked-icon   | `string`             | `star-f`           | 选中图标，与 `Icon` 组件 `name` 一致     | N    |
| unchecked-icon | `string`             | `star`             | 未选中的图标，与 `Icon` 组件 `name` 一致 | N    |
| active-color   | `string`             | `rgb(250, 200, 0)` | 选中时图标颜色                           | N    |
| allow-clear    | `boolean`            | `true`             | 是否允许反选清空                         | N    |
| disabled       | `boolean`            | `false`            | 是否禁用                                 | N    |
