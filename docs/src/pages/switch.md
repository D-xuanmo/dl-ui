# Switch 开关

## 基础用法

```vue client=Mobile playground=MSwitch height=400
<template>
  <d-cell title="基础用法">
    <d-switch v-model="value" />
    <d-switch :value="value" />
  </d-cell>
  <d-cell title="默认值">
    <d-switch v-model="value1" />
  </d-cell>
  <d-cell title="方形">
    <d-switch v-model="value" :round="false" />
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
</template>
<script setup>
import { ref } from 'vue'

const value = ref(false)
const value1 = ref(true)
</script>
```

## loading 模拟请求用法

通过 `before-change` 钩子拦截，返回 `true` 则切换，返回 `false` 或者 `Promise.reject` 则不切换

```vue client=Mobile playground=26jbtd2
<template>
  <d-switch v-model="value" :loading="loading" :before-change="beforeChange" />
</template>
<script setup>
import { ref } from 'vue'

const value = ref(false)
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

| 参数         | 类型                     | 默认值 | 说明                                                                                | 必传 |
| ------------ | ------------------------ | ------ | ----------------------------------------------------------------------------------- | ---- |
| v-model      | `boolean`                | -      | 绑定的值                                                                            | N    |
| loading      | `boolean`                | false  | 可设置加载状态                                                                      | N    |
| disabled     | `boolean`                | false  | 禁用状态设置                                                                        | N    |
| round        | `boolean`                | true   | 是否显示为圆角类型                                                                  | N    |
| beforeChange | `() => Promise<boolean>` | -      | 值发生改变前的拦截，返回 `true` 则切换，返回 `false` 或者 `Promise.reject` 则不切换 | N    |

### Slots

| 名称           | 说明                   |
| -------------- | ---------------------- |
| icon           | 自定义图标             |
| checked-icon   | 自定义选中状态下图标   |
| unchecked-icon | 自定义未选中状态下图标 |
