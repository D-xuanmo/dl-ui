<template>
  <div :class="wrapperClassName">
    <tab-nav :nav-list="items" :active="value" :style="navStyle" @tab-click="handleTabClick" />
    <div :class="contentClassName">
      <component :is="childrenMap.get(value)?.component" :key="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, Fragment, SetupContext } from 'vue'
import { getComponentName, useConfig, useModelValue } from '@xuanmo/dl-common'
import { TABS_PROPS, TabsProps } from './props'
import { createTabsNameSpace } from './utils'
import { TabsItemType, TabsValueType } from './types'
import TabNav from './tab-nav.vue'

const [name, bem] = createTabsNameSpace()

export default defineComponent({
  name,
  components: {
    TabNav
  },
  props: TABS_PROPS,
  emits: ['update:model-value', 'tab-click'],
  setup(props, { slots, emit }) {
    const config = useConfig(['round'], props)
    const wrapperClassName = computed(() =>
      bem({
        round: config.value.round
      })
    )
    const navClassName = bem('nav')
    const navItemClassName = bem('nav-item')
    const contentClassName = bem('content')
    const childrenMap = new Map<TabsValueType, TabsItemType>()

    const navStyle = computed<CSSProperties>(() => {
      if (props.sticky) {
        return {
          position: 'sticky',
          top: 0
        }
      }
      return {}
    })

    const items = computed(() => {
      const result: TabsItemType[] = []
      slots.default?.().forEach((item) => {
        const name = (item.type as any)?.name
        if (getComponentName(name) === 'tab-panel') {
          const child = {
            label: item.props?.label,
            name: item.props?.name,
            component: item
          }
          result.push(child)
          childrenMap.set(child.name, child)
        } else if (item.type === Fragment && Array.isArray(item.children)) {
          item.children?.forEach((_item: any) => {
            const name = (_item.type as any)?.name
            if (getComponentName(name) === 'tab-panel') {
              const child = {
                label: _item.props?.label,
                name: _item.props?.name,
                component: _item
              }
              result.push(child)
              childrenMap.set(child.name, child)
            }
          })
        }
      })
      return result
    })

    const [value, updateValue] = useModelValue<string | number, TabsProps>(
      props,
      emit as SetupContext['emit']
    )

    const handleTabClick = (item: TabsItemType, index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { component, ...rest } = item
      updateValue(item.name)
      emit('tab-click', rest, index)
    }

    return {
      wrapperClassName,
      navClassName,
      navItemClassName,
      contentClassName,
      items,
      value,
      childrenMap,
      navStyle,
      handleTabClick
    }
  }
})
</script>
