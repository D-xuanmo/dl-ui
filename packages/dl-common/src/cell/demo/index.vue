<template>
  <d-cell
    title="PC 左右布局"
    content="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    description="我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容"
    suffix="后缀"
    arrow
    required
  >
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
  <d-cell
    title="PC 上下布局"
    content="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    description="我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容"
    suffix="后缀"
    arrow
    required
    layout="vertical"
  >
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
  <d-cell
    title="移动端左右布局"
    content="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    description="我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容"
    suffix="后缀"
    arrow
    required
    client-type="MOBILE"
  >
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
  <d-cell
    title="移动端上下布局"
    content="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    description="我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容"
    suffix="后缀"
    arrow
    required
    layout="vertical"
    client-type="MOBILE"
  >
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
</template>

<script setup lang="ts">
import { TipsOutlined, CloseOutlined } from '@xuanmo/dl-icons'
</script>
