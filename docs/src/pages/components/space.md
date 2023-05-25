# Space 间距

可用于给多个元素增加间距。

```vue client=Mobile playground=Space
<template>
  <d-space direction="vertical" :gap="24">
    <d-space :gap="8">
      <d-button theme="primary">按钮</d-button>
      <d-button theme="primary">按钮</d-button>
      <d-button theme="primary">按钮</d-button>
    </d-space>

    <d-space :gap="8" direction="vertical">
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
    </d-space>

    <div>
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
    </div>
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
