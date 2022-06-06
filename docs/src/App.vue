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
    <d-preview-h5 v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { createNamespace } from '@/utils/bem'
import { useRoute } from 'vue-router'
import menus from './menus'
import DMenu from './components/menu'
import DPreviewH5 from './components/preview-h5/index.vue'

const [name, bem] = createNamespace('doc')

export default defineComponent({
  name,

  components: {
    DMenu,
    DPreviewH5
  },

  setup() {
    const isDemoRoute = ref(/\/demo/g.test(location.pathname))
    const demoPath = ref('')
    const route = useRoute()

    watch(
      () => route.path,
      () => {
        demoPath.value = `${import.meta.env.BASE_URL}demo${route.path}?preview=true`
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
