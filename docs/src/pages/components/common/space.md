---
columns: 2
---

# Space 间距

可用于给多个元素增加间距。

```vue playground=2bl1idi title=水平方向
<template>
  <markdown>
    通过 `gap` 可设置元素间的间距。
  </markdown>
  <d-space :gap="8">
    <d-button theme="primary">按钮</d-button>
    <d-button theme="primary">按钮</d-button>
    <d-button theme="primary">按钮</d-button>
  </d-space>
</template>
```

```vue playground=3ica8m7 title=垂直方向
<template>
  <d-space :gap="8" direction="vertical">
    <d-button block theme="primary">按钮</d-button>
    <d-button block theme="primary">按钮</d-button>
    <d-button block theme="primary">按钮</d-button>
  </d-space>
</template>
```

```vue playground=389vma8
<template>
  <d-space :gap='10' direction="vertical">
    <p>水平对齐方式</p>
    <d-radio-group v-model="justify" direction="horizontal">
      <d-radio value="start" label="start" />
      <d-radio value="center" label="center" />
      <d-radio value="end" label="end" />
      <d-radio value="between" label="between" />
      <d-radio value="around" label="around" />
      <d-radio value="evenly" label="evenly" />
    </d-radio-group>
    <d-space :gap="8" :justify="justify">
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
    </d-space>
  </d-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const justify = ref('start')
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|gap|`number`|-|空格间隙，单位：`px`|N|
|direction|`DirectionType`|`horizontal`|排列方式，水平、垂直|N|
|justify|`SpaceJustifyType`|-|水平排列方式|N|
|align|`SpaceAlignType`|-|垂直排列对齐方式|N|
|wrap|`boolean`|-|是否自动换行，水平时生效|N|

### TypeScript 类型
```typescript
type SpaceJustifyType = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type SpaceAlignType = 'start' | 'center' | 'end' | 'baseline'
type DirectionType = 'horizontal' | 'vertical'

import type {
  SpaceJustifyType,
  SpaceAlignType,
  DirectionType
} from '@xuanmo/dl-ui'
```
