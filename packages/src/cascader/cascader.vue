<template>
  <span :class="triggerClassName" @click="showPicker">
    <span style="vertical-align: middle">{{ displayName }}</span>
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
          v-for="column in activeColumns"
          :key="column.value"
          :class="bem('option', { active: column.value === active, disabled: column.disabled })"
          @click="handleChange(column)"
        >
          <span>{{ column.label }}</span>
          <d-icon v-if="column.value === active" name="success-1" size="large" />
        </div>
      </d-tab-panel>
    </d-tabs>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, SetupContext, watch } from 'vue'
import { createCascaderNameSpace, findColumnsByValue } from './utils'
import { CASCADER_PROPS, CascaderValueType } from './props'
import DPopup from '../popup'
import { DTabs, DTabPanel } from '../tabs'
import useModelValue from '../hooks/useModelValue'
import { CascadeDataType } from '../common'
import DIcon from '../icon'
import { deepCopy, isEmpty, isObject } from '@xuanmo/javascript-utils'

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
    const [value, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const wrapperClassName = bem()
    const contentClassName = bem('content')
    const headerClassName = bem('header')
    const cancelBtnClassName = bem('cancel')
    const confirmBtnClassName = bem('confirm')

    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: isEmpty(value.value),
        disabled: props.disabled || props.readonly
      })
    )

    const visible = ref(false)

    const activeColumns = ref<CascadeDataType[]>([])
    const activePath = ref<CascadeDataType[]>([])
    const displayName = ref(props.placeholder ?? '')

    // 当前选择的值
    const active = ref<string | number>('')

    const showPicker = () => {
      if (props.readonly || props.disabled) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    const formatColumns = () => {
      const result = findColumnsByValue(deepCopy(value.value).reverse()[0], props.columns)
      if (result) {
        const { columns, path } = result
        const placeholder = getPlaceholder()
        activeColumns.value = columns
        activePath.value = isEmpty(path) ? [placeholder] : path
        active.value = isEmpty(path) ? placeholder.value : path[path.length - 1].value
        displayName.value = path?.map((item) => item.label).join('/') ?? ''
      }
    }

    const getPlaceholder = (value?: string | number) => ({
      value: `__placeholder@${value}`,
      label: '请选择'
    })

    const handleTabChange = (data: any) => {
      const { columns, path } = findColumnsByValue(data.name, props.columns)!
      activeColumns.value = columns
      activePath.value = path
      active.value = path[path.length - 1].value
    }

    const handleChange = (data: CascadeDataType) => {
      const { path } = findColumnsByValue(data.value, props.columns)!
      const placeholder = getPlaceholder(data.value)
      if (data.children) {
        activeColumns.value = data.children
        activePath.value = [...path, { value: placeholder.value, label: placeholder.label }]
        active.value = placeholder.value
      } else {
        activePath.value = path
        active.value = data.value
      }
    }

    const handleConfirm = () => {
      const labels: string[] = []
      const _value = activePath.value
        .filter((item) => !(item.value as string)?.includes('__placeholder'))
        .map((item) => {
          labels.push(item.label)
          return isObject(value.value) ? { label: item.label, value: item.value } : item.value
        })
      displayName.value = labels.join('/')
      hidePicker()
      updateValue(_value as CascaderValueType)
    }

    const handleCancel = () => {
      formatColumns()
      hidePicker()
    }

    watch(() => props.columns, formatColumns, { immediate: true })

    // 监听首次传入的数据和 columns，找出对应的 label
    const stop = watch(
      () => value,
      () => {
        const { path } = findColumnsByValue(deepCopy(value.value).reverse()[0], props.columns) ?? {}
        displayName.value = path?.map((item) => item.label).join('/') ?? ''
        nextTick(() => stop())
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
      activeColumns,
      activePath,
      displayName,
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
