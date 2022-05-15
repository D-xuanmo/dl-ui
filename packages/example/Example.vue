<template>
  <div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'

const [name] = createNamespace('example')

const props = {
  count: {
    type: Number,
    required: true as const
  }
}

export default defineComponent({
  name,
  props
})
</script>
