<template>
  <div>{{ count }}</div>
  <div>globalConfig: {{ globalConfig }}</div>
  <slot name="code"></slot>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { createNamespace } from '@/utils/bem'
import { GLOBAL_CONFIG_CONTEXT_KEY } from '@/context'

const [name] = createNamespace('example')

const props = {
  count: {
    type: Number,
    required: true as const
  }
}

export default defineComponent({
  name,
  props,
  setup() {
    const globalConfig = inject(GLOBAL_CONFIG_CONTEXT_KEY)
    return {
      globalConfig
    }
  }
})
</script>
