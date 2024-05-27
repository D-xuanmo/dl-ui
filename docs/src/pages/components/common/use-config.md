# useConfig

需要将 `ConfigProvider` 作为父组件进行包裹。

## 引入

```typescript
import { useConfig } from '@xuanmo/dl-common'

// 移动端项目
import { useConfig } from '@xuanmo/dl-ui'
```

## 示例

### 父组件

```html
<template>
  <d-config-provider client-type="MOBILE">
    <child-component />
  </d-config-provider>
</template>
```

### 子组件

```html
<template>
  <span></span>
</template>

<script setup lang="ts">
import { useConfig } from '@xuanmo/dl-common'
const config = useConfig(['clientType'])
console.log(config)
</script>
```

## API

### 类型定义

```typescript
import { ComputedRef } from 'vue'
import { CustomKeys, ConfigProviderProps } from '@xuanmo/dl-common'

function useConfig<
  T extends keyof ConfigProviderProps, 
  P extends Pick<ConfigProviderProps, T>
>(keys: T[], currentProps?: P): ComputedRef<{ 
  [Key in T]: Key extends 'keys' ? Required<CustomKeys> : ConfigProviderProps[Key]; 
}>;
```
