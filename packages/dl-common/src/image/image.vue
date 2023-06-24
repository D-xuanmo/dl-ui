<template>
  <div :class="wrapperClassName" :style="wrapperStyle">
    <img :src="src" :alt="alt" :style="imageStyle" @load="handleLoad" @error="handleError" />
    <div v-if="loading || loadError" :class="tipsClassName">
      <loading2-outlined v-if="loading && !loadError" :class="tipsIconClassName" :spin="loading" />
      <template v-if="loadError">
        <image-fail-outlined :class="tipsIconClassName" />
        <p>{{ errorText }}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, watch } from 'vue'
import { createNamespace, addUnit } from '../utils'
import { IMAGE_PROPS } from './props'
import { Loading2Outlined, ImageFailOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('image')

export default defineComponent({
  name,
  components: {
    Loading2Outlined,
    ImageFailOutlined
  },
  props: IMAGE_PROPS,
  setup(props) {
    const wrapperClassName = bem()
    const tipsClassName = bem('tips')
    const tipsIconClassName = bem('tips-icon')

    // 加载中状态
    const loading = ref<boolean>(props.showLoading ?? true)

    // 加载失败
    const loadError = ref(props.showError ?? false)

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

    watch(
      () => props.showError,
      () => {
        loadError.value = props.showError
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
