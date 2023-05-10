<template>
  <span :class="triggerClassName" @click="showPicker">
    <span style="vertical-align: middle">{{ displayName || placeholder }}</span>
    <d-icon v-if="!readonly" name="arrow-right" color="var(--d-secondary-text-color)" />
  </span>
  <d-popup
    :visible="visible"
    :title="title"
    :popup-class="wrapperClassName"
    placement="bottom"
    round
    @update:visible="handleCancel"
  >
    <template #header-left>
      <span v-if="cancelButtonText" :class="cancelBtnClassName" @click="handleCancel">
        {{ cancelButtonText }}
      </span>
    </template>
    <template #header-right>
      <span v-if="confirmButtonText" :class="confirmBtnClassName" @click="handleConfirm">
        {{ confirmButtonText }}
      </span>
    </template>
    <d-tabs v-model="activeTab" :class="contentClassName" sticky @tab-click="handleTabChange">
      <d-tab-panel
        v-for="item in activePath"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      >
        <div
          v-for="option in activeOptions"
          :key="option.value"
          :class="bem('option', { active: option.value === activeTab, disabled: option.disabled })"
          @click="handleChange(option)"
        >
          <span>{{ option.label }}</span>
          <d-icon v-if="loadingMap.get(option.value)" name="loading" spin size="medium" />
          <d-icon v-if="option.value === activeTab" name="success-1" size="large" />
        </div>
      </d-tab-panel>
    </d-tabs>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { cascaderOptionsToMap, createCascaderNameSpace } from './utils'
import { CASCADER_PROPS } from './props'
import { pickLastItem, isEmpty, isObject, deepCopy } from '@xuanmo/javascript-utils'
import { CascadeOption, CascaderObjectValue, CascaderValue, DataType } from '../common'
import useModelValue from '../hooks/useModelValue'
import DPopup from '../popup'
import { DTabs, DTabPanel } from '../tabs'
import DIcon from '../icon'
import { watchOnce } from '../hooks/watch-once'
import { TabsItemType } from '../tabs/types'

const [name, bem] = createCascaderNameSpace()

export default defineComponent({
  name,
  components: {
    DPopup,
    DTabs,
    DTabPanel,
    DIcon
  },
  props: CASCADER_PROPS,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const wrapperClassName = bem()
    const contentClassName = bem('content')
    const headerClassName = bem('header')
    const cancelBtnClassName = bem('cancel')
    const confirmBtnClassName = bem('confirm')

    // 显示名称
    const displayName = ref('')

    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: isEmpty(innerValue.value) || isEmpty(displayName.value),
        disabled: props.disabled || props.readonly
      })
    )

    // 将 options 树形结构转换为 map
    let optionsMap: ReturnType<typeof cascaderOptionsToMap> = new Map()

    const visible = ref(false)

    // 选择过程中的占位前缀
    const placeholderPrefix = '__placeholder__'

    // 子级加载状态
    const loadingMap = ref(new Map<DataType['value'], boolean>())

    // 当前面板选项
    const activeOptions = ref<CascadeOption[]>([])

    // 当前选中的数据路径
    const activePath = ref<CascadeOption[]>([])

    // 当前选择的值
    const activeTab = ref<string | number>('')

    const showPicker = () => {
      if (props.readonly || props.disabled) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    const findPathAndColumns = (value: CascaderValue) => {
      return (value as any).reduce(
        (prev: any, current: CascaderValue[number], currentIndex: number) => {
          let option = isObject(current)
            ? optionsMap.get((current as CascaderObjectValue[number]).value)
            : optionsMap.get(current as DataType['value'])
          if (option) {
            prev.path.push(option)
            if (currentIndex === value.length - 2) {
              prev.options = option?.children
            }
          }
          return prev
        },
        {
          path: [],
          options: []
        }
      ) as { path: CascadeOption[]; options: CascadeOption[] }
    }

    const getPlaceholder = (value?: string | number) => ({
      value: `${placeholderPrefix}${value}`,
      label: '请选择'
    })

    const handleTabChange = (data: TabsItemType, tabIndex: number) => {
      if (data.name.includes(placeholderPrefix) || activePath.value.length - 1 === tabIndex) return
      activePath.value = activePath.value.filter((_, index) => index <= tabIndex)
      activeOptions.value =
        tabIndex === 0 ? props.options : activePath.value[tabIndex - 1].children ?? []
      activeTab.value = pickLastItem(activePath.value).value
    }

    const handleChange = async (data: CascadeOption) => {
      const placeholder = getPlaceholder(data.value)
      if (props.lazy) {
        if (loadingMap.value.get(data.value)) return
        const cacheOptions = optionsMap.get(data.value)
        if (!cacheOptions?.children) {
          loadingMap.value.set(data.value, true)
          const options = (await props.lazyLoad?.(data))!
          loadingMap.value.set(data.value, false)
          optionsMap.set(data.value, {
            ...data,
            children: options
          })
          options.forEach((item) => {
            optionsMap.set(item.value, item)
          })
        }
        const activeOption = optionsMap.get(data.value)
        activePath.value.splice(activePath.value.length - 1, 1, activeOption!)
        // 如果返回的 options 为空，则代表已经是最后一级
        if (isEmpty(activeOption?.children)) {
          activeTab.value = data.value
          return
        }
        activeOptions.value = activeOption?.children ?? []
        activePath.value.push({ value: placeholder.value, label: placeholder.label })
        activeTab.value = placeholder.value
      } else {
        const value = deepCopy(activePath.value)
        value.splice(activePath.value.length - 1, 1, data)
        const { path } = findPathAndColumns(value)
        if (data.children) {
          activeOptions.value = data.children
          activePath.value = [...path, { value: placeholder.value, label: placeholder.label }]
          activeTab.value = placeholder.value
        } else {
          activePath.value = path
          activeTab.value = data.value
        }
      }
    }

    const handleConfirm = () => {
      const labels: string[] = []
      const _value = activePath.value
        .filter((item) => !(item.value as string)?.includes(placeholderPrefix))
        .map((item) => {
          labels.push(item.label)
          return isObject(innerValue.value) ? { label: item.label, value: item.value } : item.value
        })
      displayName.value = labels.join('/')
      hidePicker()
      updateValue(_value as CascaderValue)
    }

    const handleCancel = () => {
      const { path } = findPathAndColumns(innerValue.value)
      activePath.value = path
      activeOptions.value =
        path.length - 2 <= 0 ? props.options : path[path.length - 2].children ?? []
      hidePicker()
    }

    watch(
      () => props.options,
      (originalOptions) => {
        optionsMap = cascaderOptionsToMap(originalOptions)
        const placeholder = getPlaceholder()
        const { path, options } = findPathAndColumns(innerValue.value)
        activePath.value = isEmpty(path) ? ([placeholder] as any) : path
        activeOptions.value = isEmpty(path) ? originalOptions : options
        activeTab.value = pickLastItem(path)?.value || placeholder.value
        displayName.value = path?.map((item) => item.label).join('/')
      },
      { immediate: true }
    )

    // 监听首次传入的数据和 option，找出对应的 label
    watchOnce(
      innerValue,
      () => {
        const { path } = findPathAndColumns(innerValue.value)
        displayName.value = isEmpty(path) ? '' : path?.map((item) => item.label).join('/')
      },
      {
        immediate: true
      }
    )

    return {
      wrapperClassName,
      contentClassName,
      triggerClassName,
      headerClassName,
      cancelBtnClassName,
      confirmBtnClassName,
      visible,
      activeTab,
      activeOptions,
      activePath,
      displayName,
      loadingMap,
      bem,
      showPicker,
      handleCancel,
      handleTabChange,
      handleChange,
      handleConfirm
    }
  }
})
</script>
