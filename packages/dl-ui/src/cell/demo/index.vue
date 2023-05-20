<template>
  <d-cell-group title="CellGroup 分组">
    <d-cell title="我是标题" content="内容" />
    <d-cell title="我是标题" content="内容" />
  </d-cell-group>
  <d-cell-group title="展示圆角" round>
    <d-cell title="我是标题" content="内容" />
    <d-cell title="我是标题" content="内容" />
  </d-cell-group>

  <d-cell title="我是标题" content="内容" />
  <d-cell title="我是标题" content="必填标识" required />
  <d-cell content="隐藏标题" hide-title />
  <d-cell title="扩展内容" content="正文" suffix="单位" />
  <d-cell title="扩展内容" content="正文">
    <template #suffix>单位</template>
  </d-cell>
  <d-cell title="显示图标" left-icon="tips" right-icon="close" />
  <d-cell title="显示图标" content="图标大小、颜色控制">
    <template #left-icon>
      <tips-outlined size="small" color="#f00" />
    </template>
    <template #right-icon>
      <close-outlined color="#f00" />
    </template>
  </d-cell>
  <d-cell title="显示右侧箭头" arrow content="正文内容" />
</template>

<script setup lang="ts">
import { TipsOutlined, CloseOutlined } from '@xuanmo/dl-icons'
</script>
