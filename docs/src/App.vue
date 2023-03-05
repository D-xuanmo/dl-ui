<template>
  <div :class="containerClassName">
    <doc-header v-if="!isDemoRoute" />
    <div :class="outContentClassName">
      <template v-if="!isDemoRoute">
        <!-- 左侧菜单 -->
        <div :class="menuClassName">
          <header>组件预览</header>
          <DMenu :data="menus" />
        </div>

        <!-- 文档内容区 -->
        <div :class="innerContentClassName">
          <div :class="scrollClassName"><router-view /></div>
        </div>

        <iframe :src="demoPath" :class="mobileDemoClassName" />
      </template>
      <d-preview-h5 v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import menus from './menus'
import DMenu from './components/menu'
import DPreviewH5 from './components/preview-h5/index.vue'
import DocHeader from './layout/doc-header.vue'
import { classNames } from '@doc/utils'

const isDemoRoute = ref(/\/demo/g.test(location.pathname))
const demoPath = ref('')
const route = useRoute()

const containerClassName = computed(() => classNames({ mobile: isDemoRoute.value }))
const outContentClassName = classNames('out-content')
const menuClassName = classNames('menu')
const innerContentClassName = classNames('inner-content')
const scrollClassName = classNames('scroll')
const mobileDemoClassName = classNames('demo-mobile')

watch(
  () => route.path,
  () => {
    demoPath.value = `${import.meta.env.BASE_URL}demo${route.path}?preview=true`
    isDemoRoute.value = /^\/demo/.test(route.path)
  }
)
</script>
