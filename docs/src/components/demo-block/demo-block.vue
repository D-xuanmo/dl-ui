<template>
  <div :class="wrapperClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'
import './style.scss'

const [name, bem] = createNamespace('demo-block')
export default defineComponent({
  name,
  setup() {
    return {
      wrapperClasses: bem()
    }
  }
})
</script>
