# Cell 单元格

用于展示 2 列信息，左侧为标题，右侧为内容的场景。

## 引入

```typescript
import { createApp } from 'vue';
import { DCell, DCellGroup } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DCell).use(DCellGroup)
```

## 代码演示

```vue title=分组 client=Mobile previewType=self playground=MCell secondPath=CellGroup
<template>
  <d-cell-group title="CellGroup 分组">
    <d-cell title="我是标题" content="内容" />
    <d-cell title="我是标题" content="内容" />
  </d-cell-group>
  <d-cell-group title="展示圆角" round>
    <d-cell title="我是标题" content="内容" />
    <d-cell title="我是标题" content="内容" />
  </d-cell-group>
</template>
```

```vue title=单元格 client=Mobile previewType=self playground=MCell
<template>
  <d-cell title="我是标题" content="内容" />
  <d-cell title="我是标题" content="内容" description='我是一段描述' />
  <d-cell title="我是标题" content="必填标识" required />
  <d-cell content="隐藏标题" hide-title />
  <d-cell title="扩展内容" content="正文" suffix="单位" />
  <d-cell title="扩展内容(slot)" content="正文">
    <template #suffix>单位</template>
  </d-cell>
  <d-cell title="显示图标" left-icon="tips" right-icon="close" />
  <d-cell title="显示图标" content="图标大小、颜色控制">
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
  <d-cell title="显示右侧箭头" arrow content="正文内容" />
</template>

<script setup lang="ts">
import { TipsOutlined, CloseOutlined } from '@xuanmo/dl-icons'
</script>
```

## API

### CellGroup Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|title|`string`|-|分组标题|N|
|cell-title-width|`string`|`80px`|单元格标题宽度|N|
|round|`boolean`|`false`|是否展示圆角|N|
|border|`boolean`|`true`|是否显示边框|N|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型|N|

### Cell Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|title|`string`|-|标题|N|
|title-width|`string`|`80px`|标题宽度|N|
|title-class|`string`|-|标题类名|N|
|title-align|`string`|`left`|标题对齐方式，可选值：`left/center/right`|N|
|hide-title|`boolean`|`false`|是否隐藏标题|N|
|required|`boolean`|`false`|是否显示必填标识|N|
|content|`string`|-|内容|N|
|content-class|`string`|-|内容类名|N|
|content-align|`string`|`right`|内容对齐方式，可选值：`left/center/right`|N|
|disabled|`boolean`|-|是否禁用|N|
|suffix|`string`|-|扩展内容|N|
|arrow|`boolean`|`false`|是否显示右侧箭头|N|
|border|`boolean`|true|是否显示边框|N|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型|N|
|description|`string`|-|描述|N|

### Cell Slots

|名称|说明|
|---|----|
|default|自定义内容|
|title|自定义标题|
|left-icon|左侧标题自定义图标|
|right-icon|右侧自定义图标|
|suffix|自定义扩展内容|

### TypeScript 类型
```typescript
import type { CellGroupProps, CellProps } from '@xuanmo/dl-ui'
```


## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-cell-group-title-gap-bottom|var(--d-gap-xs)|标题下外边距|
|--d-cell-group-title-gap-padding|var(--d-gap-sm)|标题左右内边距|
|--d-cell-group-gap-bottom|var(--d-gap-sm)|分组与分组间的边距|
|--d-cell-group-radius|var(--d-radius-large)|分组圆角|
|--d-cell-padding|var(--d-horizontal-gap) var(--d-gap-sm)|单元格内边距|
|--d-cell-background|var(--d-white-color)|单元格背景色|
