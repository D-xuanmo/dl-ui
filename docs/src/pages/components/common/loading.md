---
columns: 2
---

# Loading 加载提示

表示数据正在请求中。

## 引入

```typescript
import { createApp } from 'vue';
import { DLoading } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DLoading)
```

## 代码演示

```vue title=基础用法
<template>
  <markdown>`loading` 尺寸分为 `small`、`medium`、`large`或者自定义尺寸</markdown>
  <d-space :gap="16" direction="vertical">
    <d-loading size="small">我是一段内容</d-loading>
    <d-loading size="medium">我是一段内容</d-loading>
    <d-loading  size="large">我是一段内容</d-loading>
    <d-loading  size="50px">我是一段内容</d-loading>
  </d-space>
</template>
```

```vue title=自定义图标
<template>
  <d-loading>
    我是一段内容
    <template #icon>
      <loading-outlined spin size="large" />
    </template>
  </d-loading>
</template>
<script setup>
import { LoadingOutlined } from '@xuanmo/dl-icons'
</script>
```

```vue title=延迟
<template>
  <markdown>设置 `delay` 防止请求过快出现闪烁的问题。</markdown>
  <d-loading :loading='loading' :delay='1000'>我是一段内容</d-loading>
  <d-button theme='primary' @click='show'>{{ loading ? '关闭' : '显示' }}</d-button>
</template>
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const show = () => {
  loading.value = !loading.value
}
</script>
```

```vue title=服务模式调用
<template>
  <d-button theme='primary' @click='open'>显示</d-button>
</template>
<script setup>
import { LoadingPlugin } from '@xuanmo/dl-common'

const open = () => {
  LoadingPlugin.open({
    description: '加载中...'
  })

  setTimeout(() => {
    LoadingPlugin.close()
  }, 1000)
}
</script>
```

## API

### Loading Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|loading|`boolean`|-|是否显示 loading|N|
|description|`string`|-|提示文字|N|
|delay|`number`|-|延迟显示 loading，单位：毫秒|N|
|size|`IconProps['size']`|-|图标大小|N|
|layout|`DirectionType`|-|布局类型，上下、左右|N|
|full-screen|`boolean`|`false`|是否全屏显示|N|
|prevent-scroll-through|`boolean`|`true`|全屏状态下禁止滚动穿透|N|

### TS 类型

```ts
import { LoadingPlugin, type LoadingProps } from '@xuanmo/dl-common'
```
