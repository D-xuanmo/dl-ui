# Switch 开关

## 基础用法

```vue
<template>
  <DCell title="基础用法">
    <DSwitch v-model="value" />
    <DSwitch :value="value" />
  </DCell>
  <DCell title="默认值">
    <DSwitch v-model="value1" />
  </DCell>
  <DCell title="方形">
    <DSwitch
      v-model="value"
      :round="false"
    />
  </DCell>
  <DCell title="禁用">
    <DSwitch
      v-model="value"
      disabled
    />
  </DCell>
  <DCell title="自定义图标">
    <DSwitch v-model="value">
      <template #icon>🤓</template>
    </DSwitch>
  </DCell>
  <DCell title="自定义图标">
    <DSwitch v-model="value">
      <template #checked-icon>🌝</template>
      <template #unchecked-icon>🌚</template>
    </DSwitch>
  </DCell>
</template>
<script setup>
import { ref } from 'vue'

const value = ref(false)
const value1 = ref(true)
</script>
```

## loading 模拟请求用法

通过 `before-change` 钩子拦截，返回 `true` 则切换，返回 `false` 或者 `Promise.reject` 则不切换

```vue
<template>
  <DSwitch
    v-model="value"
    :loading="loading"
    :before-change="beforeChange"
  />
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
