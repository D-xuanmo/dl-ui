<template>
  <div :class="wrapperClassName" :style="wrapperStyle">
    <ul ref="wrapperRef" :class="scrollClassName">
      <template v-if="needPlaceholder">
        <scroll-radio-item v-for="item in markNum" :key="item" :option-height="optionHeight" />
      </template>
      <scroll-radio-item
        v-for="item in options"
        :key="item.value"
        :option="item"
        :option-height="optionHeight"
      />
      <template v-if="needPlaceholder">
        <scroll-radio-item v-for="item in markNum" :key="item" :option-height="optionHeight" />
      </template>
    </ul>
    <div :class="maskClassName">
      <div :class="maskTopClassName" :style="markItemStyle"></div>
      <div :class="maskBottomClassName" :style="markItemStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, createNamespace } from '@xuanmo/dl-common'
import { SCROLL_RADIO_PROPS } from './props'
import ScrollRadioItem from './scroll-radio-item.vue'
import { debounce } from '@xuanmo/javascript-utils'
import { IData } from '../common'

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

    const markNum = Math.floor(props.visibleOptionNum / 2)
    const markItemHeight = computed(() => props.optionHeight * markNum)
    const markItemStyle = computed<CSSProperties>(() => ({
      height: addUnit(markItemHeight.value)
    }))

    const wrapperStyle = computed<CSSProperties>(() => ({
      height: addUnit(props.optionHeight * props.visibleOptionNum)
    }))

    const scrollToCurrent = () => {
      const index = props.options.findIndex((item) => item.value === props.value)
      wrapperRef.value?.scrollTo(0, index * props.optionHeight)
    }

    const findNext = (current: IData, index: number): [IData, number] => {
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
      wrapperRef,
      wrapperStyle,
      markNum
    }
  }
})
</script>
