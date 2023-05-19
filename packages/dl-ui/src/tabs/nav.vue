<template>
  <ul ref="navRef" :class="wrapperClassName">
    <nav-item
      v-for="(item, index) in navList"
      :key="item.name"
      :active="item.name === active"
      @click="handleTabClick(item, index)"
    >
      {{ item.label }}
    </nav-item>
    <li :class="lineClassName" :style="lineStyle" />
  </ul>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue'
import { createTabsNameSpace } from './utils'
import NavItem from './nav-item.vue'
import { TabsItemType } from './types'
import { addUnit } from '@xuanmo/dl-common'

const [name, bem] = createTabsNameSpace('nav')

export default defineComponent({
  name,
  components: {
    NavItem
  },
  props: {
    active: {
      type: [String, Number],
      default: ''
    },
    navList: {
      type: Array as PropType<TabsItemType[]>,
      required: true,
      default: () => []
    }
  },
  emits: ['tab-click'],
  setup(props, { emit }) {
    const wrapperClassName = bem()
    const lineClassName = bem('nav', 'line', true)
    const navRef = ref<HTMLUListElement>()
    const lineStyle = ref<CSSProperties>({})

    const calcLineStyle = async () => {
      await nextTick()
      const activeEl = navRef.value!.querySelector(
        '[class*=tabs__nav-item--active]'
      ) as HTMLLIElement
      lineStyle.value = {
        width: addUnit(activeEl?.offsetWidth),
        transform: `translate3d(${addUnit(activeEl?.offsetLeft)}, 0, 0)`
      } as CSSProperties

      navRef.value!.scrollTo(navRef.value!.scrollWidth, 0)
    }

    const handleTabClick = (item: TabsItemType, index: number) => {
      emit('tab-click', item, index)
    }

    onMounted(calcLineStyle)

    watch(() => props.active, calcLineStyle)

    return {
      wrapperClassName,
      lineClassName,
      navRef,
      lineStyle,
      handleTabClick
    }
  }
})
</script>
