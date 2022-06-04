<template>
  <DCell title="打开遮罩层">
    <DSwitch v-model="visible"></DSwitch>
    <DOverlay v-model:visible="visible" />
  </DCell>
  <DCell
    title="修改过渡时间"
    title-width="100px"
  >
    <DSwitch v-model="visible2"></DSwitch>
    <DOverlay
      v-model:visible="visible2"
      duration="1s"
    />
  </DCell>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>
