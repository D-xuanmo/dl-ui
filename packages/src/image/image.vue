<template>
  <div :class="wrapperClassName" :style="wrapperStyle">
    <img :src="src" :alt="alt" :style="imageStyle" @load="handleLoad" @error="handleError" />
    <div v-if="loading || loadError" :class="tipsClassName">
      <d-icon
        v-if="loading && !loadError"
        :name="loadingIcon"
        :class="tipsIconClassName"
        :spin="loading"
      />
      <template v-if="loadError">
        <d-icon :name="errorIcon" :class="tipsIconClassName" />
        <p>{{ errorText }}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, watch } from 'vue'
import { createNamespace } from '../utils'
import { imageProps } from './props'
import { addUnit } from '../utils'

const [name, bem] = createNamespace('image')

export default defineComponent({
  name,
  props: imageProps,
  setup(props) {
    const wrapperClassName = bem()
    const tipsClassName = bem('tips')
    const tipsIconClassName = bem('tips-icon')

    // 加载中状态
    const loading = ref<boolean>(props.showLoading ?? true)

    // 加载失败
    const loadError = ref(false)

    const wrapperStyle = computed<CSSProperties>(() => ({
      width: addUnit(props.width),
      height: addUnit(props.height)
    }))
    const imageStyle = computed<CSSProperties>(() => ({
      objectFit: props.fit,
      objectPosition: props.position,
      borderRadius: props.round ? '50%' : props.radius
    }))

    watch(
      () => props.showLoading,
      () => {
        loading.value = props.showLoading
      }
    )

    const handleLoad = () => {
      // 外部控制 loading，内部将不控制
      if (!props.showLoading) {
        loading.value = false
      }
    }

    const handleError = () => {
      loadError.value = true
    }

    return {
      wrapperClassName,
      tipsClassName,
      wrapperStyle,
      imageStyle,
      tipsIconClassName,
      loading,
      loadError,
      handleLoad,
      handleError
    }
  }
})
</script>
