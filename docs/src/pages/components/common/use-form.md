# useForm

表单下的子组件获取当前表单的一些全局参数，如 `store`、`formProps` 等。

## 引入

```typescript
import { useForm } from '@xuanmo/dl-common'

// 移动端项目
import { useForm } from '@xuanmo/dl-ui'
```

## 示例

```html
<template>
  <span></span>
</template>

<script setup lang="ts">
import { useForm } from '@xuanmo/dl-common'
const { store, formProps } = useForm()
console.log({ store, formProps })
</script>
```

## API

### 返回值

|名称|描述|
|---|---|
|store|当前表单 FormStore|
|formProps|当前表单 formProps|
