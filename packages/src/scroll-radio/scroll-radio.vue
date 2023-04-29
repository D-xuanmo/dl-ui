<template>
  <div :class="wrapperClassName">
    <ul ref="wrapperRef" :class="scrollClassName">
      <scroll-radio-item :option-height="optionHeight" />
      <scroll-radio-item :option-height="optionHeight" />
      <scroll-radio-item
        v-for="item in options"
        :key="item.value"
        :option="item"
        :option-height="optionHeight"
      />
      <scroll-radio-item :option-height="optionHeight" />
      <scroll-radio-item :option-height="optionHeight" />
    </ul>
    <div :class="maskClassName">
      <div :class="maskTopClassName" :style="markItemStyle"></div>
      <div :class="maskBottomClassName" :style="markItemStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { SCROLL_RADIO_PROPS } from './props'
import ScrollRadioItem from './scroll-radio-item.vue'
import { debounce } from '@xuanmo/javascript-utils'
import { DataType } from '../common'

const [name, bem] = createNamespace('scroll-radio')

export default defineComponent({
  name,
  components: {
    ScrollRadioItem
  },
  props: SCROLL_RADIO_PROPS,
  emits: ['change'],
  setup(props, { emit }) {
    const wrapperClassName = bem()
    const scrollClassName = bem('scroll')
    const maskClassName = bem('mask')
    const maskTopClassName = bem('mask', ['top'], true)
    const maskBottomClassName = bem('mask', ['bottom'], true)
    const wrapperRef = ref<HTMLUListElement | null>(null)

    const markItemHeight = computed(() => props.optionHeight * 2)
    const markItemStyle = computed<CSSProperties>(() => ({
      height: addUnit(markItemHeight.value)
    }))

    const scrollToCurrent = () => {
      const index = props.options.findIndex((item) => item.value === props.value)
      wrapperRef.value?.scrollTo(0, index * props.optionHeight)
    }

    const findNext = (current: DataType, index: number): [DataType, number] => {
      if (!current.disabled) return [current, index]
      const newIndex = props.options.findIndex((item) => item.value === current.value) + 1
      return findNext(props.options[newIndex], newIndex)
    }

    const scrollHandler = debounce((event: Event) => {
      const target = event.target as HTMLUListElement
      let currentIndex = Math.round(target.scrollTop / props.optionHeight)
      let current = props.options[currentIndex]
      if (current.disabled) {
        ;[current, currentIndex] = findNext(current, currentIndex)
      }
      target.scrollTo(0, currentIndex * props.optionHeight)
      emit('change', current, currentIndex)
    }, 100)

    onMounted(() => {
      scrollToCurrent()
      wrapperRef.value?.addEventListener('scroll', scrollHandler)
    })

    onUnmounted(() => {
      wrapperRef.value?.removeEventListener('scroll', scrollHandler)
    })

    watch(() => props.value, scrollToCurrent)

    return {
      wrapperClassName,
      scrollClassName,
      maskClassName,
      maskTopClassName,
      maskBottomClassName,
      markItemStyle,
      wrapperRef
    }
  }
})
</script>
