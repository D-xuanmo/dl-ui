# Switch 开关

用于打开、关闭状态间的切换；

通过 `before-change` 钩子拦截，返回 `true` 则切换，返回 `false` 或者 `Promise.reject` 则不切换。

## 引入

```typescript
import { createApp } from 'vue';
import { DSwitch } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DSwitch)
```

## 代码演示

```vue client=Mobile playground=MSwitch
<template>
  <d-cell-group cell-content-align="right">
    <d-cell title="基础用法">
      <d-switch v-model="value" />
    </d-cell>
    <d-cell title="尺寸">
      <d-space :gap="5" justify="end">
        <d-switch v-model="value" size="small" />
        <d-switch v-model="value" size="medium" />
        <d-switch v-model="value" size="large" />
      </d-space>
    </d-cell>
    <d-cell title="方形尺寸">
      <d-space :gap="5" justify="end">
        <d-switch v-model="value" size="small" :round="false" />
        <d-switch v-model="value" size="medium" :round="false" />
        <d-switch v-model="value" size="large" :round="false" />
      </d-space>
    </d-cell>
    <d-cell title="禁用">
      <d-switch v-model="value" disabled />
    </d-cell>
    <d-cell title="自定义图标">
      <d-switch v-model="value">
        <template #icon>🤓</template>
      </d-switch>
    </d-cell>
    <d-cell title="自定义图标">
      <d-switch v-model="value">
        <template #checked-icon>🌝</template>
        <template #unchecked-icon>🌚</template>
      </d-switch>
    </d-cell>
    <d-cell title="模拟请求">
      <d-switch v-model="value2" :loading="loading" :before-change="beforeChange" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
const value2 = ref(false)
const loading = ref(false)

function beforeChange() {
  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false
      resolve(true)
    }, 1000)
  })
}
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`boolean`|-|绑定的值|Y|
|loading|`boolean`|`false`|可设置加载状态|N|
|disabled|`boolean`|`false`|禁用状态设置|N|
|round|`boolean`|`true`|是否显示为圆角类型|N|
|size|`'small' \| 'medium' \| 'large'`|`medium`|尺寸|N|
|before-change|`() => Promise<boolean>`|-|值发生改变前的拦截，返回 `true` 则切换，返回 `false` 或者 `Promise.reject` 则不切换|N|

### Slots

|名称|说明|
|---|----|
|icon|自定义图标|
|checked-icon|自定义选中状态下图标|
|unchecked-icon|自定义未选中状态下图标|

### Events

|事件|说明|回调参数|
|---|----|-------|
|change|内容发生改变时触发|`value: boolean(当前输入内容)`|

### TS 类型

```typescript
import type { SwitchProps } from '@xuanmo/dl-ui'
```

## 主题定制

### CSS 变量

|变量名|默认值|描述|
|-----|-----|----|
|--d-switch-bg-color|#bcbcbc|开关未开启时背景色|
|--d-switch-small-width|30px|`size=small` 时宽度|
|--d-switch-small-height|16px|`size=small` 时高度|
|--d-switch-medium-width|40px|`size=medium` 时宽度|
|--d-switch-medium-height|20px|`size=medium` 时高度|
|--d-switch-large-width|50px|`size=large` 时宽度|
|--d-switch-large-height|24px|`size=large` 时高度|
