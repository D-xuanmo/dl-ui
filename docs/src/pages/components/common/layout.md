# Layout 布局

可快速搭建页面的主体框架。

## 引入

```typescript
import { createApp } from 'vue';
import {
  DLayout,
  DLayoutHeader,
  DLayoutSider,
  DLayoutContent,
  DLayoutFooter
} from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app
  .use(DLayout)
  .use(DLayoutHeader)
  .use(DLayoutSider)
  .use(DLayoutContent)
  .use(DLayoutFooter)
```

## 代码演示

```vue title=基础用法
<template>
  <div style="height: 300px">
    <d-layout>
      <d-layout-header>header</d-layout-header>
      <d-layout-sider>sider</d-layout-sider>
      <d-layout-content>
        <p v-for="i in 100" :key="i">content{{ i }}</p>
      </d-layout-content>
      <d-layout-footer>footer</d-layout-footer>
    </d-layout>
  </div>
</template>
```

```vue title=侧边栏开启折叠
<template>
  <div style="height: 300px">
    <d-layout>
      <d-layout-header>header</d-layout-header>
      <d-layout-sider collapsed>sider</d-layout-sider>
      <d-layout-content>content</d-layout-content>
      <d-layout-sider collapsed placement="right">sider</d-layout-sider>
      <d-layout-footer>footer</d-layout-footer>
    </d-layout>
  </div>
</template>
```

```vue title=嵌套使用
<template>
  <div style="height: 300px">
    <d-layout>
      <d-layout-sider collapsed>sider</d-layout-sider>
      <d-layout>
        <d-layout-header>header</d-layout-header>
        <d-layout-sider collapsed>sider</d-layout-sider>
        <d-layout-content>content</d-layout-content>
        <d-layout-sider collapsed placement="right">sider</d-layout-sider>
        <d-layout-footer>footer</d-layout-footer>
      </d-layout>
      <d-layout-sider collapsed placement="right">sider</d-layout-sider>
    </d-layout>
  </div>
</template>
```

## API

### LayoutSider Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|width|`number \| string`|`200px`|侧边栏宽度，为 `number` 时，自动添加 `px`|N|
|border|`boolean`|`false`|是否显示边框|N|
|collapsed|`boolean`|`false`|是否开启折叠|N|
|collapsed-width|`number`|`48px`|折叠后宽度|N|
|placement|`'left' \| 'right'`|`left`|侧边栏位置|N|

### LayoutHeader、LayoutFooter Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|height|`number \| string`|`50px`|高度，为 `number` 时，自动添加 `px`|N|
|border|`boolean`|`false`|是否显示边框|N|
