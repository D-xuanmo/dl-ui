# Image 图片

基于 `img` 标签封装，增加 `loading`、`加载失败` 效果

```vue client=Mobile playground=Image
<template>
  <d-demo-block title="基础用法">
    <d-image :src="imgSrc" width="100" />
  </d-demo-block>

  <d-demo-block title="填充模式">
    <d-space :gap="20" wrap>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="cover" />
        <p>cover</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="contain" />
        <p>contain</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="none" />
        <p>none</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="scale-down" />
        <p>scale-down</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="fill" />
        <p>fill</p>
      </div>
    </d-space>
  </d-demo-block>

  <d-demo-block title="位置">
    <d-space :gap="20">
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="cover" position="left" />
        <p>left</p>
      </div>
    </d-space>
  </d-demo-block>

  <d-demo-block title="显示加载效果">
    <d-image
      src="https://upyun.xuanmo.xin/logo/20230311103746211510.JPG"
      width="100"
      height="100"
      show-loading
    />
  </d-demo-block>

  <d-demo-block title="加载失败">
    <d-image
      src="https://upyun.xuanmo.xin/logo/202303111037462115101.JPG"
      width="100"
      height="100"
    />
  </d-demo-block>
</template>

<script lang="ts" setup>
const imgSrc = 'https://upyun.xuanmo.xin/logo/x-logo.png'
</script>
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
|loading-icon|`string`|-|loading 图标，与 `Icon` 组件 `name` 属性一致|N|
|error-icon|`string`|-|加载失败图标，与 `Icon` 组件 `name` 属性一致|N|
|error-text|`string`|-|加载失败提示文案|N|

### TypeScript 类型
```typescript
import type { ImageProps } from '@xuanmo/dl-ui'
```
