<template>
  <d-tabs v-model="store.activeTab.value" :class="tabClassName" sticky @tab-click="onTabChange">
    <d-tab-panel
      v-for="item in store.activePath.value"
      :key="item[store.valueKey]"
      :label="item[store.labelKey]"
      :name="item[store.valueKey]"
    >
      <cascader-option
        v-for="option in store.activeOptions.value"
        :key="option[store.valueKey]"
        :store="store"
        :option="option"
        :active="option[store.valueKey] === store.activeTab.value"
        @change="onChange(option)"
      />
    </d-tab-panel>
  </d-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createCascaderNameSpace } from './utils'
import { CASCADER_BODY_PROPS } from './props'
import { DTabs, DTabPanel } from '../tabs'
import { TabsItemType } from '../tabs/types'
import { ICascaderOption } from '@xuanmo/dl-common'
import { isEmpty, throwError } from '@xuanmo/utils'
import CascaderOption from './cascader-option.vue'

const [cascaderName] = createCascaderNameSpace()
const [name, bem] = createCascaderNameSpace('content')

export default defineComponent({
  name,
  components: { DTabs, DTabPanel, CascaderOption },
  props: CASCADER_BODY_PROPS,
  setup(props) {
    const { store } = props
    const tabClassName = bem()

    const onChange = async (option: ICascaderOption) => {
      if (option.disabled) return
      const updateFirstLevel = () => {
        const { option: temporary, value } = store.getTemporaryOption()
        store.activePath.value = [option]
        store.pushPath(temporary)
        store.updateActiveTab(value)
      }
      if (props.lazy) {
        if (!props.lazyLoad) throwError(cascaderName, '未指定加载执行函数')
        const value = option[store.valueKey]
        const cachedOption = store.optionMap.get(value)!

        // 已经加载过的数据直接返回
        if (store.loadingCollect.value.has(value)) {
          if (cachedOption.__level === 1) return updateFirstLevel()
          if (
            !isEmpty(cachedOption[store.childrenKey]) &&
            !store.isTemporary(cachedOption[store.valueKey])
          ) {
            const lastPath = store.getLathPath()
            if (store.lastIsTemporary() || lastPath.__level === option.__level) {
              store.replaceLastPath(cachedOption)
            }
            const { option: temporary, value } = store.getTemporaryOption()
            store.pushPath(temporary)
            store.updateActiveTab(value)
          } else {
            store.replaceLastPath(cachedOption)
          }
          return
        }

        // 开始加载异步选项
        store.updateLoading(value, true)
        const lazyOption = await props.lazyLoad(option)
        store.updateLoading(value, false)

        // 转换加载回来的选项列表
        const formattedLazyOption = lazyOption.map((item) => {
          const formatted = {
            ...item,
            __level: option.__level! + 1,
            __parent: option[store.valueKey]
          }
          store.optionMap.set(item[store.valueKey], formatted)
          return formatted
        })

        // 更新当前选项
        const newOption = {
          ...option,
          [store.childrenKey]: formattedLazyOption
        }
        store.optionMap.set(value, newOption)

        // 如果没有返回，则代表是最后一级选项
        if (isEmpty(formattedLazyOption)) {
          store.replaceLastPath(newOption)
          return
        }

        // 选项加载完成补充占位选项、更新当前路径
        const { option: temporary, value: temporaryValue } = store.getTemporaryOption()
        store.replaceLastPath(newOption)
        store.pushPath(temporary)
        store.updateActiveTab(temporaryValue)
      } else {
        if (option.__level === 1) return updateFirstLevel()
        if (!isEmpty(option[store.childrenKey]) && !store.isTemporary(option[store.valueKey])) {
          const lastPath = store.getLathPath()
          if (store.lastIsTemporary() || lastPath.__level === option.__level) {
            store.replaceLastPath(option)
          }
          const { option: temporary, value } = store.getTemporaryOption()
          store.pushPath(temporary)
          store.updateActiveTab(value)
        } else {
          store.replaceLastPath(option)
        }
      }
    }

    const onTabChange = (data: TabsItemType, tabIndex: number) => {
      if (data.name.includes(store.temporaryPrefix) || store.getOption(data.name)?.__level === 1) {
        return store.updatePath([store.getOption(data.name)!])
      }
      store.updatePath(store.activePath.value.filter((item) => item.__level! <= tabIndex + 1))
    }

    return { tabClassName, bem, onChange, onTabChange }
  }
})
</script>
