<template>
  <d-cell-group
    v-for="item in menus"
    :key="item.id"
    :title="item.groupTitle"
    round
  >
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

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'
import menus from '../../menus'
import { useRouter } from 'vue-router'

const [name] = createNamespace('component-list')

export default defineComponent({
  name,
  setup() {
    const router = useRouter()

    const goDetail = (path: string) => router.push(`/demo${path}`)

    return {
      menus,
      goDetail
    }
  }
})
</script>
