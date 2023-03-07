<template>
  <d-cell-group v-for="item in menus" :key="item.id" :title="item.groupTitle" round>
    <d-cell
      v-for="{ content, id, path } in item.children"
      :key="id"
      :content="content"
      content-align="left"
      arrow
      @click="goDetail(path)"
    />
  </d-cell-group>
</template>

<script lang="ts" setup>
import menus from '../../menus'
import { useRouter } from 'vue-router'

const router = useRouter()

const goDetail = (path?: string) => router.push(`/demo${path}`)
</script>
