---
columns: 2
---

# Button 按钮

用来触发一些动作。

## 引入

```typescript
import { createApp } from 'vue';
import { DButton } from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DButton)
```

## 代码演示

```vue client=PC playground=3hbs5el title=基础用法
<template>
  <markdown>
    按钮 `theme` 分别为：`default`、`primary`、`success`、`warning`、`danger`。
  </markdown>
  <d-space :gap="10" wrap>
    <d-button theme="default">default</d-button>
    <d-button theme="primary">primary</d-button>
    <d-button theme="success">success</d-button>
    <d-button theme="warning">warning</d-button>
    <d-button theme="danger">danger</d-button>
  </d-space>
</template>
```

```vue client=PC playground=3qt7u5f title=填充模式
<template>
  <markdown>
    通过 `fill` 属性可改变按钮的填充模式，默认为：`solid`。
  </markdown>
  <d-space :gap="10">
    <d-button fill="solid" theme="primary">solid</d-button>
    <d-button fill="outline">outline</d-button>
    <d-button fill="none">none</d-button>
  </d-space>
</template>
```

```vue client=PC playground=1kcishh title=镂空主题
<template>
  <d-space :gap="10">
    <d-button theme="default" fill="outline">default</d-button>
    <d-button theme="primary" fill="outline">primary</d-button>
    <d-button theme="success" fill="outline">success</d-button>
    <d-button theme="warning" fill="outline">warning</d-button>
    <d-button theme="danger" fill="outline">danger</d-button>
  </d-space>
</template>
```

```vue client=PC playground=31fd1au title=按钮尺寸
<template>
  <markdown>
    按钮尺寸分别有：`small`、`medium`、`large`，默认为：`medium`。
  </markdown>
  <d-space :gap="10">
    <d-button size="small" fill="solid" theme="primary">small</d-button>
    <d-button size="medium" fill="solid" theme="primary">medium</d-button>
    <d-button size="large" fill="solid" theme="primary">large</d-button>
  </d-space>
</template>
```

```vue client=PC playground=1kcishh title=虚线模式
<template>
  <markdown>
    设置 `dashed` 可展示虚线按钮。
  </markdown>
  <d-space :gap="10">
    <d-button theme="default" dashed>default</d-button>
    <d-button theme="primary" dashed>primary</d-button>
    <d-button theme="success" dashed>success</d-button>
    <d-button theme="warning" dashed>warning</d-button>
    <d-button theme="danger" dashed>danger</d-button>
  </d-space>
</template>
```

```vue client=PC playground=1i7qpa6 title=形状
<template>
  <markdown>
    设置 `shape` 可切换按钮形状，值分别为：`default`、`round`、`rectangular`，默认为：`default`。
  </markdown>
  <d-space :gap="10">
    <d-button theme="primary">default</d-button>
    <d-button shape="round" theme="primary">round</d-button>
    <d-button shape="rectangular" theme="primary">rectangular</d-button>
  </d-space>
</template>
```

```vue client=PC playground=3jttodi title=链接模式
<template>
  <d-space :gap="10">
    <d-button link theme="default">default</d-button>
    <d-button link theme="primary">primary</d-button>
    <d-button link theme="success">success</d-button>
    <d-button link theme="warning">warning</d-button>
    <d-button link theme="danger">danger</d-button>
  </d-space>
</template>
```

```vue client=PC playground=1qj33c9 title=禁用状态
<template>
  <d-space :gap="10">
    <d-button theme="primary" disabled>default</d-button>
    <d-button theme="success" fill="outline" disabled>default</d-button>
    <d-button shape="rounded" disabled theme="danger">rounded</d-button>
  </d-space>
</template>
```

```vue client=PC playground=dl1jbm title=加载状态
<template>
  <d-space :gap="10">
    <d-button theme="primary" loading>default</d-button>
    <d-button theme="success" fill="outline" loading>default</d-button>
    <d-button shape="rounded" loading theme="danger">rounded</d-button>
  </d-space>
</template>
```

```vue client=PC playground=3evff5f title=图标模式
<template>
  <d-space :gap="10">
    <d-button theme="primary">
      <template #icon>
        <star-outlined size="small" />
      </template>
    </d-button>
    <d-button theme="success">
      <template #icon>
        <star-outlined size="small" />
      </template>
      default
    </d-button>
  </d-space>
</template>

<script lang="ts" setup>
import { StarOutlined } from '@xuanmo/dl-icons'
</script>
```

```vue client=PC playground=2q78rd7 title=块级元素
<template>
  <d-space direction="vertical" :gap="8">
    <d-button block>block</d-button>
    <d-button theme="primary" block>block</d-button>
    <d-button theme="success" block>block</d-button>
  </d-space>
</template>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|theme|`ThemeEnum`|`default`|主题颜色|N|
|size|`SizeEnum`|`medium`|按钮大小|N|
|disabled|`boolean`|`false`|是否禁用按钮|N|
|block|`boolean`|`false`|是否展示为块级元素|N|
|fill|`'solid' \| 'outline' \| 'none'`| `solid`| 填充模式，`outline` 为镂空展示 | N |
|shape|`'default' \| 'round' \| 'rectangular'`|`default`|按钮形状|N|
|loading|`boolean`|`false`|是否显示 loading 效果|N|
|link|`boolean`|`false`|链接模式|N|

### Slots

|名称|说明|
|---|----|
|default|内容|
|icon|按钮图标|

### TS 类型

```typescript
import type { ButtonProps } from '@xuanmo/dl-ui'

type SizeEnum = 'small' | 'medium' | 'large'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-button-large|48px|按钮 `size=large` 时高度|
|--d-button-medium|40px|按钮 `size=medium` 时高度|
|--d-button-small|32px|按钮 `size=small` 时高度|
|--d-button-disabled-opacity|0.5|按钮禁用透明度|
