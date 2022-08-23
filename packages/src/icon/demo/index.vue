<template>
  <d-cell-group title="基础用法">
    <d-cell content-align="left">
      <d-icon name="close" />
      <d-icon name="close-f" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="旋转">
    <d-cell content-align="left">
      <d-icon name="loading" spin />
      <d-icon name="loading-2" spin />
      <d-icon name="close" spin />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="大小调整">
    <d-cell content-align="left">
      <d-icon name="close" size="small" />
      <d-icon name="close" size="medium" />
      <d-icon name="close" size="large" />
      <d-icon name="tips" size="30px" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="颜色修改">
    <d-cell content-align="left">
      <d-icon name="close" color="#f00" />
      <d-icon name="close" color="#ed7b2f" />
      <d-icon name="close" color="var(--d-primary)" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="线性图标">
    <d-cell content-align="left">
      <d-icon v-for="name in lineIcons" :key="name" :name="name" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="面性图标">
    <d-cell content-align="left">
      <d-icon v-for="name in facetIcons" :key="name" :name="name" />
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
const icons = import.meta.glob('../icons/*.svg')
const lineIcons: string[] = []
const facetIcons: string[] = []
Object.keys(icons).forEach((path) => {
  const { filename } = /\/(?<filename>[a-z\d-]+)\.svg$/.exec(path)?.groups ?? {}
  ;/-f$/.test(filename) ? facetIcons.push(filename) : lineIcons.push(filename)
})
</script>
