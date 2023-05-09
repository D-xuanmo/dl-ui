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
    <d-tabs v-model="active" :class="contentClassName" sticky @tab-click="handleTabChange">
      <d-tab-panel
        v-for="item in activePath"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      >
        <div
          v-for="option in activeOptions"
          :key="option.value"
          :class="bem('option', { active: option.value === active, disabled: option.disabled })"
          @click="handleChange(option)"
        >
          <span>{{ option.label }}</span>
          <d-icon v-if="loadingMap.get(option.value)" name="loading" spin size="medium" />
          <d-icon v-if="option.value === active" name="success-1" size="large" />
        </div>
      </d-tab-panel>
    </d-tabs>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { createCascaderNameSpace, findOptionsByValue } from './utils'
import { CASCADER_PROPS } from './props'
import { pickLastItem, isEmpty, isObject } from '@xuanmo/javascript-utils'
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

    const visible = ref(false)

    // 选择过程中的占位前缀
    const placeholderPrefix = '__placeholder__'

    // 子级加载状态
    const loadingMap = ref(new Map<DataType['value'], boolean>())

    // 当前面板选项
    const activeOptions = ref<CascadeOption[]>([])

    // 当前选中的数据路径
    const activePath = ref<CascadeOption[]>([])

    // 懒加载的数据
    const lazyOptions = new Map<DataType['value'], CascadeOption[]>()

    // 当前选择的值
    const active = ref<string | number>('')

    // 最后一级数据
    const lastValue = computed(() => {
      const value = pickLastItem<CascaderValue>(innerValue.value)
      if (isObject(innerValue.value)) {
        return (innerValue.value as unknown as CascaderObjectValue[number]).value
      }
      return value
    })

    const showPicker = () => {
      if (props.readonly || props.disabled) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    const formatOptions = () => {
      // TODO 查询待优化
      const result = findOptionsByValue(lastValue.value, props.options)
      if (result) {
        const { options, path } = result
        const placeholder = getPlaceholder()
        activeOptions.value = options
        activePath.value = isEmpty(path) ? [placeholder] : path
        active.value = isEmpty(path) ? placeholder.value : path[path.length - 1].value
        displayName.value = path?.map((item) => item.label).join('/') ?? ''
      }
    }

    const getPlaceholder = (value?: string | number) => ({
      value: `${placeholderPrefix}${value}`,
      label: '请选择'
    })

    const handleTabChange = (data: TabsItemType, tabIndex: number) => {
      if (data.name.includes(placeholderPrefix)) return
      if (props.lazy) {
        activePath.value = activePath.value.filter((_, index) => index <= tabIndex)
        if (tabIndex === 0) {
          activeOptions.value = props.options
        } else {
          activeOptions.value = lazyOptions.get(data.name)!
        }
      } else {
        const { options, path } = findOptionsByValue(data.name, props.options)!
        activeOptions.value = options
        activePath.value = path
      }
      active.value = pickLastItem(activePath.value).value
    }

    const handleChange = async (data: CascadeOption) => {
      const placeholder = getPlaceholder(data.value)
      if (props.lazy) {
        if (loadingMap.value.get(data.value)) return
        const cacheOptions = lazyOptions.get(data.value)
        let options: CascadeOption[]
        if (cacheOptions) {
          options = lazyOptions.get(data.value)!
        } else {
          loadingMap.value.set(data.value, true)
          options = (await props.lazyLoad?.(data))!
          loadingMap.value.set(data.value, false)
          lazyOptions.set(data.value, options!)
        }
        activePath.value.splice(activePath.value.length - 1, 1, {
          value: data.value,
          label: data.label
        })
        // 如果返回的 options 为空，则代表已经是最后一级
        if (isEmpty(options)) {
          active.value = data.value
          return
        }
        activeOptions.value = options!
        activePath.value.push({ value: placeholder.value, label: placeholder.label })
        active.value = placeholder.value
      } else {
        const { path } = findOptionsByValue(data.value, props.options)!
        if (data.children) {
          activeOptions.value = data.children
          activePath.value = [...path, { value: placeholder.value, label: placeholder.label }]
          active.value = placeholder.value
        } else {
          activePath.value = path
          active.value = data.value
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
      !props.lazy && formatOptions()
      hidePicker()
    }

    watch(() => props.options, formatOptions, { immediate: true })

    // 监听首次传入的数据和 option，找出对应的 label
    watchOnce(
      innerValue,
      () => {
        const { path } = findOptionsByValue(lastValue.value, props.options) ?? {}
        displayName.value = path?.map((item) => item.label).join('/') ?? ''
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
      active,
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
