# NavBar 导航栏

用于全局导航，支持标题、返回箭头、左右按钮。

## 引入

```typescript
import { createApp } from 'vue';
import { DNavBar } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DNavBar)
```

## 代码演示

```vue client=Mobile playground=MNavBar previewType=iframe
<template>
  <d-space direction="vertical" :gap="30">
    <d-nav-bar title="标题" @click-left="onLeftClick" />
    <d-nav-bar
      left-text="返回"
      title="标题居左"
      title-align="left"
      back-arrow
      right-text="按钮"
      @click-left="onLeftClick"
      @click-right="onRightClick"
    />
    <d-nav-bar
      left-text="返回"
      title="标题"
      back-arrow
      right-text="按钮"
      @click-left="onLeftClick"
      @click-right="onRightClick"
    />
  </d-space>
</template>

<script setup lang="ts">
import { useMessage } from '@xuanmo/dl-common'

const message = useMessage()

const onLeftClick = () => {
  message.info('点击了左侧按钮')
}

const onRightClick = () => {
  message.info('点击了右侧按钮')
}
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|title|`string`|-|标题|Y|
|title-align|`'left' \| 'center'`|`center`|标题对齐方式|N|
|left-text|`string`|-|左侧文字|N|
|right-text|`string`|-|右侧文字|N|
|back-arrow|`boolean`|`false`|是否显示返回箭头|N|
|border|`boolean`|`true`|是否显示下边框|N|
|button-highlight|`boolean`|`true`|左右两侧的按钮是否显示主题色|N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|click-left|左侧按钮点击事件|`() => void`|
|click-right|右侧按钮点击事件|`() => void`|

### TS 类型

```typescript
import type { NavBarProps } from '@xuanmo/dl-ui'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|--|
|--d-nav-bar-background|`var(--d-white-color)`|导航栏背景颜色|
|--d-nav-bar-height|`48px`|导航栏高度|
|--d-nav-bar-font-size|`var(--d-font-size-title)`|导航栏标题字号|
|--d-nav-bar-button-font-size|`var(--d-font-size-md)`|导航栏按钮字号|
|--d-nav-bar-gap|`var(--d-gap-sm)`|导航栏间距|
