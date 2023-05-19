# Button 按钮

```vue client=Mobile playground=MButton
<template>
  <dl-demo-block>
    <p>填充模式</p>
    <d-button fill="solid" theme="primary">solid</d-button>
    <d-button fill="outline" class="m-l-5px m-r-5px">outline</d-button>
    <d-button fill="none">none</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>链接模式</p>
    <d-space :gap="8">
      <d-button link theme="default">default</d-button>
      <d-button link theme="primary">primary</d-button>
      <d-button link theme="success">success</d-button>
      <d-button link theme="warning">warning</d-button>
      <d-button link theme="danger">danger</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>尺寸</p>
    <d-button size="small" fill="solid" theme="primary">small</d-button>
    <d-button size="medium" fill="solid" theme="primary" class="m-l-5px m-r-5px">medium</d-button>
    <d-button size="large" fill="solid" theme="primary">large</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>主题</p>
    <d-button theme="default" class="m-r-5px m-b-5px">default</d-button>
    <d-button theme="primary" class="m-r-5px m-b-5px">primary</d-button>
    <d-button theme="success" class="m-r-5px m-b-5px">success</d-button>
    <d-button theme="warning" class="m-r-5px m-b-5px">warning</d-button>
    <d-button theme="danger" class="m-r-5px m-b-5px">danger</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>镂空主题</p>
    <d-button block theme="default" fill="outline" class="m-b-10px">default</d-button>
    <d-button block theme="primary" fill="outline" class="m-b-10px">primary</d-button>
    <d-button block theme="success" fill="outline" class="m-b-10px">success</d-button>
    <d-button block theme="warning" fill="outline" class="m-b-10px">warning</d-button>
    <d-button block theme="danger" fill="outline" class="m-b-10px">danger</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>形状</p>
    <d-button theme="primary">default</d-button>
    <d-button shape="rounded" theme="primary" class="m-l-5px m-r-5px">rounded</d-button>
    <d-button shape="rectangular" theme="primary">rectangular</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>禁用</p>
    <d-button theme="primary" disabled>default</d-button>
    <d-button theme="success" fill="outline" disabled class="m-l-5px m-r-5px">default</d-button>
    <d-button shape="rounded" disabled theme="danger">rounded</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>加载状态</p>
    <d-button theme="primary" loading>default</d-button>
    <d-button theme="success" fill="outline" loading class="m-l-5px m-r-5px">default</d-button>
    <d-button shape="rounded" loading theme="danger">rounded</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>图标模式</p>
    <d-button theme="primary" icon="star" />
    <d-button theme="success" icon="star-f" class="m-l-5px m-r-5px">default</d-button>
    <d-button theme="success" fill="outline" icon="star-f">default</d-button>
  </dl-demo-block>
</template>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|theme|`ThemeType`|`default`|主题颜色|N|
|size|`SizeType`|`medium`|按钮大小|N|
|disabled|`boolean`|`false`|是否禁用按钮|N|
|icon|`string`|-|按钮前图标，与 `Icon` 组件 `name` 一致|N|
|block|`boolean`|`false`|是否展示为块级元素|N|
|fill|`'solid' \| 'outline' \| 'none'`| `solid`| 填充模式，`outline` 为镂空展示 | N |
|shape|`'default' \| 'rounded' \| 'rectangular'`|`default`|按钮形状|N|
|loading|`boolean`|`false`|是否显示 loading 效果|N|
|link|`boolean`|`false`|链接模式|N|

### TypeScript 类型

```typescript
import type { ButtonProps } from '@xuanmo/dl-ui'

type SizeType = 'small' | 'medium' | 'large'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-button-large-height|44px|按钮 `size=large` 时高度|
|--d-button-medium-height|40px|按钮 `size=medium` 时高度|
|--d-button-small-height|36px|按钮 `size=small` 时高度|
|--d-button-disabled-opacity|0.5|按钮禁用透明度|
