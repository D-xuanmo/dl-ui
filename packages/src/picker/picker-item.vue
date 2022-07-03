<template>
  <div :class="wrapperClassName">
    <div
      :class="overlayClassName"
      :style="overlayStyle"
    />
    <div
      :class="overlayClassName"
      :style="overlayStyle"
    />
    <ul
      ref="wrapperRef"
      :class="contentClassName"
      :style="wrapperStyle"
    >
      <li
        v-for="(item, index) in options"
        :key="item.value"
        :class="bem({ selected: selectedIndex === index, disabled: item.disabled })"
      >
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, onMounted, ref, watch } from 'vue'
import { createNamespace } from '../utils/bem'
import { pickerItemProps } from './picker-item-props'
import Picker from './picker.class'

const [name, bem] = createNamespace('picker-item')

export default defineComponent({
  name,
  props: pickerItemProps,
  setup(props) {
    const wrapperRef = ref<HTMLElement | null>(null)
    const wrapperClassName = bem('wrapper')
    const contentClassName = bem('content')
    const itemClassName = bem()
    const overlayClassName = bem('overlay')

    let picker: Picker | null = null

    const overlayHeight = computed(() => props.optionHeight * 2)

    const overlayStyle = computed<CSSProperties>(() => ({
      height: `${overlayHeight.value}px`
    }))

    const selectedIndex = computed(() => {
      const index = props.options?.findIndex((item) => item.value === props.value)
      return index < 0 ? 0 : index
    })

    const wrapperStyle = computed<CSSProperties>(() => ({
      marginTop: `${overlayHeight.value}px`,
      transform: `translate3d(0px, -${selectedIndex.value * props.optionHeight}px, 0px)`
    }))

    onMounted(() => {
      picker = new Picker({
        el: wrapperRef.value,
        options: props.options,
        itemHeight: props.optionHeight,
        onChange: props.onChange
      })
    })

    watch(
      () => props.options,
      () => {
        picker?.update({ options: props.options })
      }
    )

    return {
      wrapperRef,
      wrapperClassName,
      contentClassName,
      itemClassName,
      overlayClassName,
      overlayStyle,
      selectedIndex,
      wrapperStyle,
      bem
    }
  }
})
</script>
