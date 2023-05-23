# Cascader 级联选择器

用于树形数据选择，常用于地址选择

最新中国内地行政区域数据下载 [https://github.com/D-xuanmo/china-region](https://github.com/D-xuanmo/china-region)

```vue client=Mobile playground=MCascader previewType=iframe
<template>
  <d-cell-group cell-title-width="100px">
    <d-cell title="基础用法">
      <d-cascader v-model="value" :options="template" placeholder="数据加载中..." />
    </d-cell>
    <d-cell title="绑定对象数组">
      <d-cascader
        v-model="value2"
        :options="template"
        title="请选择地址"
        placeholder="数据加载中..."
      />
    </d-cell>
    <d-cell title="模拟异步场景">
      <d-cascader
        v-model="value3"
        :options="template2"
        title="请选择地址"
        placeholder="请选择"
        lazy
        :lazy-load="handleLazyLoad"
      />
    </d-cell>
    <d-cell title="禁用">
      <d-cascader v-model="value" :options="template" disabled />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ICascaderOption } from '../../common'

const template = ref<ICascaderOption[]>([])
const value = ref(['110000000000', '110100000000', '110102000000', '110102007000'])
const value2 = ref([
  { value: '110000000000', label: '北京市' },
  { value: '110100000000', label: '市辖区' },
  { value: '110102000000', label: '西城区' }
])
const template2 = ref<ICascaderOption[]>([
  {
    label: '北京市',
    value: '110000000000'
  },
  {
    label: '河北省',
    value: '130000000000'
  }
])
const value3 = ref([])

/**
 * 异步加载子级数据
 * @param options 当前级数据
 */
const handleLazyLoad = (options: ICascaderOption) =>
  new Promise<ICascaderOption[]>((resolve) => {
    setTimeout(() => {
      /* eslint-disable */
      switch (options.value) {
        case '110000000000':
          resolve([
            {
              label: '市辖区',
              value: '110100000000'
            }
          ])
          break
        case '110100000000':
          resolve([
            {
              label: '东城区',
              value: '110101000000'
            },
            {
              label: '西城区',
              value: '110102000000'
            },
            {
              label: '朝阳区',
              value: '110105000000'
            }
          ])
          break
        case '130000000000':
          resolve([
            {
              label: '石家庄市',
              value: '130100000000'
            },
            {
              label: '唐山市',
              value: '130200000000'
            }
          ])
          break
        /* eslint-enable */
      }
      resolve([])
    }, 1000)
  })

fetch(
  'https://my.xuanmo.xin:3202/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727'
).then(async (res) => {
  template.value = await res.json()
})
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|----|---|-----|---|----|
|model-value/v-model|`CascaderValue`|-|组件选择的值|Y|
|options|`ICascaderOption[]`|-|选项数据|Y|
|placeholder|`string`|-|提示语|N|
|title|`string`|-|支持设置一个顶部标题|N|
|disabled|`boolean`|`false`|是否禁用|N|
|readonly|`boolean`|`false`|是否只读|N|
|lazy|`boolean`|`false`|是否开启懒加载|N|
|lazy-load|`(option: ICascaderOption) => Promise<ICascaderOption[]>`|-|数据懒加载方法，需要配合 `lazy` 使用|N|
|cancel-button-text|`string`|`取消`|关闭按钮文字|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|

### 类型导出

```typescript
import type { CascaderProps, ICascaderOption, CascaderValue } from '@xuanmo/dl-ui'
```
