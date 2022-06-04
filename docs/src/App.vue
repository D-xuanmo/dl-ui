<template>
  <div :class="bem('container', { mobile: isDemoRoute })">
    <template v-if="!isDemoRoute">
      <!-- 左侧菜单 -->
      <div :class="bem('menu')">
        <header>组件预览</header>
        <DMenu :data="menus" />
      </div>

      <!-- 文档内容区 -->
      <div :class="bem('content')">
        <router-view />

        <iframe
          :src="demoPath"
          :class="bem('demo-mobile')"
        />
      </div>
    </template>
    <div
      v-else
      :class="bem('demo-wrapper')"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { createNamespace } from '@/utils/bem'
import menus from './menus'
import DMenu from './components/menu'
import { useRoute } from 'vue-router'

const [name, bem] = createNamespace('doc')

export default defineComponent({
  name,

  components: {
    DMenu
  },

  setup() {
    const isDemoRoute = ref(/\/demo/g.test(location.pathname))
    const demoPath = ref('')
    const route = useRoute()

    watch(
      () => route.path,
      () => {
        demoPath.value = `${import.meta.env.BASE_URL}demo${route.path}`
        isDemoRoute.value = /^\/demo/.test(route.path)
      }
    )

    return {
      bem,
      menus,
      isDemoRoute,
      demoPath
    }
  }
})
</script>
