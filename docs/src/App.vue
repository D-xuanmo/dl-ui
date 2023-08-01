<template>
  <preview-h5 v-if="isDemoRoute" />
  <doc-layout v-else :is-demo-route="isDemoRoute" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import DocLayout from './layout/index.vue'
import PreviewH5 from './components/preview-h5/index.vue'
import { useRoute } from 'vue-router'
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
</script>
