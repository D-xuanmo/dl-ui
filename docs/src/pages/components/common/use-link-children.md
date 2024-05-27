# useLinkChildren

表单当前容器组件下的所有子组件配置集合。

## 引入

```typescript
import { useLinkChildren } from '@xuanmo/dl-common'

// 移动端项目
import { useLinkChildren } from '@xuanmo/dl-ui'
```

## 示例

```html
<template>
  <span></span>
</template>

<script setup lang="ts">
import { useLinkChildren } from '@xuanmo/dl-common'
// 当前组件配置的 id
const children = useLinkChildren(id)
console.log(children)
</script>
```
