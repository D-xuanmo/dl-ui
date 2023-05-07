<template>
  <li :class="itemClassName">
    <slot />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createTabsNameSpace } from './utils'

const [name, bem] = createTabsNameSpace('nav-item')

export default defineComponent({
  name,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const itemClassName = computed(() =>
      bem(undefined, {
        active: props.active
      })
    )

    return {
      itemClassName
    }
  }
})
</script>
