# useFormEventEmit

 表单下子组件事件触发，通过 store 进行订阅。

## 引入

```typescript
import { useFormEventEmit } from '@xuanmo/dl-common'

// 移动端项目
import { useFormEventEmit } from '@xuanmo/dl-ui'
```

## 示例

```html
<template>
  <span></span>
</template>

<script setup lang="ts">
import { useFormEventEmit } from '@xuanmo/dl-common'

const props = definedProps<{
  model: IFormModelItem
}>()

const emit = useFormEventEmit(props.model)
// 第一个参数为事件名
// 第二个参数为当前组件数据
// 第三个参数为明细表行 id
emit('mount', '', undefined)
</script>
```
