<template>
  <div :class="bem('container')">
    <!-- 左侧菜单 -->
    <div :class="bem('menu')">
      <header>组件预览</header>
      <DMenu :data="menus" />
    </div>

    <!-- 文档内容区 -->
    <div :class="bem('content')">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'
import menus from './menus'
import DMenu from './components/menu'

const [name, bem] = createNamespace('doc')

export default defineComponent({
  name,

  components: {
    DMenu
  },

  setup() {
    return {
      bem,
      menus
    }
  }
})
</script>
