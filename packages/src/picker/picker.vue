<template>
  <span v-if="!controlled" :class="triggerClassName" @click="showPicker">
    <span style="vertical-align: middle">{{ displayValue }}</span>
    <d-icon name="arrow-right" color="var(--d-secondary-text-color)" />
  </span>
  <d-popup :visible="innerVisible" placement="bottom" @update:visible="handleClose">
    <div :class="className">
      <header :class="headerClassName">
        <span v-if="cancelButtonText" :class="cancelBtnClassName" @touchstart="handleClose">
          {{ cancelButtonText }}
        </span>
        <span>{{ title }}</span>
        <span v-if="confirmButtonText" :class="confirmBtnClassName" @click="handleChange">
          {{ confirmButtonText }}
        </span>
      </header>

      <div :class="contentClassName" :style="contentStyle">
        <d-picker-item
          v-for="(item, index) in formattedColumns"
          :key="index"
          :options="item"
          :option-height="optionHeight"
          :value="formatColumnValue(index)"
          @change="onChange($event, index)"
        />
      </div>
    </div>
  </d-popup>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, SetupContext, watch } from 'vue'
import { createNamespace } from '../utils'
import useDefault from '../hooks/useDefault'
import { DataType, OmitValueProperties } from '../common'
import { CascadeDataType, PickerColumnType, PICKER_PROPS, PickerValueType } from './props'
import DPickerItem from './picker-item.vue'
import { deepCopy, isObject } from '@xuanmo/javascript-utils'
import { formatCascade, useDisplayName } from './utils'
import { EventType } from './types'
import DIcon from '../icon'

const [name, bem] = createNamespace('picker')

export default defineComponent({
  name,
  components: { DPickerItem, DIcon },
  props: PICKER_PROPS,
  emits: ['update:visible', 'update:model-value', 'update:value', 'change', 'confirm', 'close'],
  setup(props, context: SetupContext<EventType>) {
    const className = bem()
    const headerClassName = bem('header')
    const cancelBtnClassName = bem('header', 'cancel', true)
    const confirmBtnClassName = bem('header', 'confirm', true)
    const contentClassName = bem('content')

    const [visible, updateVisible] = useDefault<
      boolean,
      OmitValueProperties<typeof props>,
      'visible',
      EventType
    >(props as OmitValueProperties<typeof props>, context.emit, 'visible', 'update:visible')

    const innerVisible = ref(false)

    const [innerValue, updateValue] = useDefault<PickerValueType, typeof props, EventType>(
      props,
      context.emit
    )

    // 是否为级联选择模式
    const isCascade = computed(() => Array.isArray((props.columns[0] as CascadeDataType)?.children))

    // 接收子级传递回来的数据
    const temporaryValue = ref<PickerValueType>(deepCopy(innerValue.value))

    // 内部渲染列使用
    const formattedColumns = computed(() => {
      if (isCascade.value) {
        return formatCascade(temporaryValue.value, props.columns as CascadeDataType[])
      }

      if (isObject(props.columns[0])) {
        return [props.columns] as PickerColumnType[][]
      }

      return props.columns as PickerColumnType[][]
    })

    const displayValue = useDisplayName(innerValue, formattedColumns, props.placeholder)
    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: displayValue.value === props.placeholder
      })
    )

    const contentStyle = computed<CSSProperties>(() => ({
      height: `${props.optionHeight * 5}px`
    }))

    const onChange = (data: DataType, columnIndex: number) => {
      temporaryValue.value[columnIndex] = data
      context.emit('change', temporaryValue.value, data)
    }

    const showPicker = () => (innerVisible.value = true)

    const handleChange = () => {
      const value = isCascade.value
        ? deepCopy(temporaryValue.value)
        : temporaryValue.value.map((item) => (item as DataType).value)
      updateValue(value)
      handleClose()
      context.emit('confirm', temporaryValue.value)
    }

    const handleClose = () => {
      if (props.controlled) updateVisible(false)
      innerVisible.value = false
      context.emit('close')
    }

    const formatColumnValue = (columnIndex: number) => {
      const columnValue = temporaryValue.value[columnIndex]
      return (isObject(columnValue) ? (columnValue as DataType).value : columnValue) as
        | string
        | number
    }

    watch(
      () => visible.value,
      (visible) => {
        innerVisible.value = visible
      }
    )

    return {
      innerVisible,
      className,
      headerClassName,
      cancelBtnClassName,
      confirmBtnClassName,
      contentClassName,
      triggerClassName,
      formattedColumns,
      contentStyle,
      isCascade,
      isObject,
      displayValue,
      showPicker,
      handleClose,
      onChange,
      handleChange,
      formatColumnValue
    }
  }
})
</script>
