<template>
  <div :class="panelClassName">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { TAB_PANEL_PROPS } from './props'

const [name, bem] = createNamespace('tab-panel')

export default defineComponent({
  name,
  props: TAB_PANEL_PROPS,
  setup() {
    const panelClassName = bem()

    return {
      panelClassName
    }
  }
})
</script>
