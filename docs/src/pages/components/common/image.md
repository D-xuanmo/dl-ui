---
columns: 2
---

# Image 图片

基于 `img` 标签封装，增加 `loading`、`加载失败` 效果。

## 引入

```typescript
import { createApp } from 'vue';
import { DImage } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DImage)
```

## 代码演示

```vue playground=26icurf title=基础用法
<template>
  <d-image src="https://upyun.xuanmo.xin/logo/dl-ui.svg" width="50" />
</template>
```

```vue playground=fnal9u title=填充模式
<template>
  <markdown>通过 `fit` 属性可设置填充规则。</markdown>
  <d-space :gap='20' wrap>
    <div class='item'>
      <d-image :src='imgSrc' width='50' height='50' fit='cover' />
      <p style='text-align: center'>cover</p>
    </div>
    <div class='item'>
      <d-image :src='imgSrc' width='50' height='50' fit='contain' />
      <p style='text-align: center'>contain</p>
    </div>
    <div class='item'>
      <d-image :src='imgSrc' width='50' height='50' fit='none' />
      <p style='text-align: center'>none</p>
    </div>
    <div class='item'>
      <d-image :src='imgSrc' width='50' height='50' fit='scale-down' />
      <p style='text-align: center'>scale-down</p>
    </div>
    <div class='item'>
      <d-image :src='imgSrc' width='50' height='50' fit='fill' />
      <p style='text-align: center'>fill</p>
    </div>
  </d-space>
</template>

<script lang='ts' setup>
const imgSrc = 'https://upyun.xuanmo.xin/logo/x-logo.png'
</script>

<style scope>
.item .d-image {
  border: var(--d-border);
}
</style>
```

```vue playground=27di7gr title=填充位置
<template>
  <markdown>通过 `position` 属性可设置图片填充位置。</markdown>
  <d-image 
    src="https://upyun.xuanmo.xin/logo/dl-ui.svg" 
    width="50" 
    fit="cover" 
    position="left" 
  />
</template>
```

```vue playground=2bfcco1 title=显示loading
<template>
  <d-image
    src="https://upyun.xuanmo.xin/logo/20230311103746211510.JPG"
    width="100"
    height="100"
    show-loading
  />
</template>
```

```vue playground=1uquphp title=加载失败
<template>
  <d-image
    src="https://upyun.xuanmo.xin/logo/202303111037462115101.JPG"
    width="100"
    height="100"
  />
</template>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|src|`string`|-|图片地址|Y|
|width|`string \| number`|-|图片宽度，类型为数字时，单位：`px`|N|
|height|`string \| number`|-|图片高度，类型为数字时，单位：`px`|N|
|alt|`string`|-|img 标签原生属性|N|
|fit|`CSSProperties['object-fit']`|`fill`|CSS [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)|N|
|position|`CSSProperties['object-position']`|-|CSS [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)|N|
|radius|`string \| number`|-|圆角大小，类型为数字时，单位：`px`|N|
|round|`boolean`|-|是否为圆形，此参数优先级高于 `radius`|N|
|show-loading|`boolean`|-|是否显示 loading|N|
|error-text|`string`|-|加载失败提示文案|N|

### TypeScript 类型

```typescript
import type { ImageProps } from '@xuanmo/dl-ui'
```
