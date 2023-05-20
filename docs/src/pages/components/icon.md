# Icon 图标

- 图标基于 `SVG` 创建；
- 图标为独立包，通过 `@xuanmo/dl-icons` 引入图标

```vue preview
<template>
  <icons-preview />
</template>
```

```vue 
<template>
  <d-cell-group title="基础用法">
    <d-cell content-align="left">
      <CheckSquareFilled />
      <check-square-filled />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="旋转">
    <d-cell content-align="left">
      <LoadingOutlined spin />
      <Loading2Outlined spin />
      <StarOutlined spin />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="大小调整">
    <d-cell content-align="left">
      <StarOutlined size="small" />
      <StarOutlined size="medium" />
      <StarOutlined size="large" />
      <StarOutlined size="50px" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="颜色修改">
    <d-cell content-align="left">
      <StarOutlined color="#f00" />
      <StarOutlined color="#ed7b2f" />
      <StarOutlined color="var(--d-primary)" />
    </d-cell>
  </d-cell-group>
</template>

<script setup lang='ts'>
import {
  CheckSquareFilled,
  LoadingOutlined, 
  Loading2Outlined,
  StarOutlined
} from '@xuanmo/dl-icons'
</script>
```

## API

### Icon Props

|参数|类型|默认值|说明|必传|
|---|----|-----|----|---|
|size|`string`|`medium`|图标大小，可选值：`small/medium/large/string`，为 `string` 时，单位为 `px`|N|
|color|`string`|-|图标颜色|N|
|spin|`boolean`|-|是否旋转图标|N|

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-icon-size-small|16px|图标 `size=small` 时尺寸|
|--d-icon-size-medium|20px|图标 `size=medium` 时尺寸|
|--d-icon-size-large|24px|图标 `size=large` 时尺寸|
