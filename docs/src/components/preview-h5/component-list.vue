<template>
  <div class="header">
    <img src="https://upyun.xuanmo.xin/logo/dl-ui.svg" alt="Vue dl-ui" width="32" />
    <h1>DL-UI</h1>
  </div>
  <p class="description">一个基于 Vue 3 的低代码组件库</p>
  <d-tabs v-model="activeTab" sticky>
    <d-tab-panel label="公用组件" name="common">
      <d-cell-group
        v-for="item in getMenuList('comp-common')"
        :key="item.id"
        :title="item.groupTitle ?? ''"
        round
      >
        <d-cell
          v-for="{ content, id, path } in item.children"
          :key="id"
          :content="content ?? ''"
          content-align="left"
          arrow
          @click="goDetail(path)"
        />
      </d-cell-group>
    </d-tab-panel>
    <d-tab-panel label="移动端组件" name="mobile">
      <d-cell-group
        v-for="item in getMenuList('comp-mobile')"
        :key="item.id"
        :title="item.groupTitle ?? ''"
        round
      >
        <d-cell
          v-for="{ content, id, path } in item.children"
          :key="id"
          :content="content ?? ''"
          content-align="left"
          arrow
          @click="goDetail(path)"
        />
      </d-cell-group>
    </d-tab-panel>
  </d-tabs>
</template>

<script lang="ts" setup>
import { getMenuList } from '@doc/menus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const activeTab = ref('common')

const goDetail = (path?: string) => router.push(`/demo${path!.replace(/\/[\w-_]+/, '')}`)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 var(--d-gap-sm) var(--d-horizontal-gap);

  img {
    margin-right: 10px;
  }

  h1 {
    font-size: 22px;
  }
}

.description {
  margin-bottom: 20px;
  padding: 0 var(--d-gap-sm);
  color: var(--d-secondary-text-color);
}

:deep(.d-tab-panel) {
  padding: var(--d-gap-sm) 0;
}
</style>
