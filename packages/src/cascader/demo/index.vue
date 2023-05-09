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
import { CascadeOption } from '../../common'

const template = ref<CascadeOption[]>([])
const value = ref(['110000000000', '110100000000', '110102000000', '110102007000'])
const value2 = ref([
  { value: '110000000000', label: '北京市' },
  { value: '110100000000', label: '市辖区' },
  { value: '110102000000', label: '西城区' }
])
const template2 = ref<CascadeOption[]>([
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
const handleLazyLoad = (options: CascadeOption) =>
  new Promise<CascadeOption[]>((resolve) => {
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

fetch('/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727').then(async (res) => {
  template.value = await res.json()
})
</script>
