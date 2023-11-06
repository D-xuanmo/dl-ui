<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { createNamespace } from '../utils'
import { LOADING_PROPS } from './props'
import { Loading2Outlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('loading')

export default defineComponent({
  name,
  components: { Loading2Outlined },
  props: LOADING_PROPS,
  setup(props) {
    const wrapperClassName = bem()
    const contentClassName = bem('content')
    const bodyClassName = computed(() =>
      bem('body', {
        [props.layout]: true,
        fullScreen: props.fullScreen,
        scrollThrough: !props.preventScrollThrough && props.fullScreen
      })
    )
    const descriptionClassName = bem('description')
    const iconClassName = bem('icon')

    const showLoading = ref(props.loading)

    watch(
      () => props.loading,
      (loading) => {
        if (loading) {
          setTimeout(() => {
            showLoading.value = true
          }, props.delay)
        } else {
          showLoading.value = false
        }
      }
    )

    return {
      wrapperClassName,
      contentClassName,
      bodyClassName,
      descriptionClassName,
      iconClassName,
      showLoading
    }
  }
})
</script>

<template>
  <div :class="wrapperClassName">
    <div :class="contentClassName">
      <slot />
    </div>
    <div v-show="showLoading" :class="bodyClassName">
      <span :class="iconClassName">
        <slot name="icon">
          <loading2-outlined spin :size="size" />
        </slot>
      </span>
      <p v-if="description" :class="descriptionClassName">{{ description }}</p>
    </div>
  </div>
</template>
