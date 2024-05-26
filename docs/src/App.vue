<template>
  <d-config-provider v-if="isDemoRoute">
    <preview-h5 />
  </d-config-provider>
  <d-config-provider v-else client-type="PC" :round="true">
    <doc-layout :is-demo-route="isDemoRoute" />
  </d-config-provider>
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
    if (isDemoRoute.value) {
      document.querySelector('html')!.classList.add('d-mobile')
    } else {
      document.querySelector('html')!.classList.remove('d-mobile')
    }
  }
)
</script>
