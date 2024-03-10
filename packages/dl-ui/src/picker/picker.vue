<template>
  <span v-if="!controlled" :class="triggerClassName" @click="showPicker">
    <span style="vertical-align: middle">{{ displayValue }}</span>
    <right-outlined v-if="!readonly" color="var(--d-secondary-text-color)" />
  </span>
  <d-popup :visible="innerVisible" placement="bottom" :title="title" @update:visible="handleClose">
    <template #header-left>
      <d-button v-if="cancelButtonText" link @click="handleClose">
        {{ cancelButtonText }}
      </d-button>
    </template>
    <template #header-right>
      <d-button v-if="confirmButtonText" link theme="primary" @click="handleConfirm">
        {{ confirmButtonText }}
      </d-button>
    </template>
    <div :class="className">
      <div :class="contentClassName" :style="contentStyle">
        <d-scroll-radio
          v-for="(item, index) in formattedColumns"
          :key="`@${index}`"
          :options="item"
          :option-height="optionHeight"
          :value="formatColumnValue(index)"
          @change="handleChange($event, index)"
        />
      </div>
    </div>
  </d-popup>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, watch } from 'vue'
import {
  ICascaderOption,
  IData,
  OmitValueProperties,
  DButton,
  DPopup,
  createNamespace,
  useModelValue,
  useConfig
} from '@xuanmo/dl-common'
import { PickerOption, PICKER_PROPS, PickerValue } from './props'
import { debounce, deepCopy, isEmpty, isObject } from '@xuanmo/utils'
import { findCascadeFirstLevelData, findDisplayName, formatCascade } from './utils'
import { EventType } from './types'
import DScrollRadio from '../scroll-radio'
import { RightOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('picker')

export default defineComponent({
  name,
  components: { RightOutlined, DScrollRadio, DButton, DPopup },
  inheritAttrs: false,
  props: PICKER_PROPS,
  emits: ['update:visible', 'update:model-value', 'change', 'confirm', 'close'],
  setup(props, context) {
    const className = bem()
    const contentClassName = bem('content')
    const config = useConfig(['keys'], props)

    const [visible, updateVisible] = useModelValue<
      boolean,
      OmitValueProperties<typeof props>,
      'visible',
      EventType
    >(props as any, context.emit, 'visible', 'update:visible')

    const innerVisible = ref(false)

    const [innerValue, updateValue] = useModelValue<PickerValue, typeof props, EventType>(
      props,
      context.emit
    )

    // 是否为级联选择模式
    const isCascade = computed(() => Array.isArray((props.options[0] as ICascaderOption)?.children))

    // 接收子级传递回来的数据，用作缓存
    const temporaryValue = ref<PickerValue>(
      !isEmpty(innerValue.value)
        ? deepCopy(innerValue.value)
        : findCascadeFirstLevelData(props.options as ICascaderOption[], config.keys)
    )
    // 内部渲染列使用
    const formattedColumns = computed(() => {
      if (isCascade.value) {
        return formatCascade(temporaryValue.value, props.options as ICascaderOption[], config.keys)
      }

      if (isObject(props.options[0])) {
        return [props.options] as PickerOption[][]
      }

      return props.options as PickerOption[][]
    })
    const displayValue = ref(props.placeholder ?? '')
    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: displayValue.value === props.placeholder || displayValue.value === '请选择',
        readonly: props.readonly,
        disabled: props.disabled
      })
    )

    const contentStyle = computed<CSSProperties>(() => ({
      height: `${props.optionHeight * 5}px`
    }))

    let currentColumn: PickerOption | null = null

    const emitChange = debounce(() => {
      context.emit('change', temporaryValue.value, currentColumn)
    }, 20)

    const handleChange = (data: IData, columnIndex: number) => {
      temporaryValue.value[columnIndex] = data
      currentColumn = data
      emitChange()
    }

    const showPicker = () => {
      if (props.disabled || props.readonly) return
      innerVisible.value = true
    }

    const handleConfirm = () => {
      const value = temporaryValue.value.map((item) =>
        isObject(item) ? (item as IData).value : item
      )
      updateValue(value as PickerValue)
      handleClose()
      context.emit('confirm', value as PickerValue)
    }

    const handleClose = () => {
      if (props.controlled) updateVisible(false)
      innerVisible.value = false
      temporaryValue.value = deepCopy(innerValue.value)
      context.emit('close')
    }

    const formatColumnValue = (columnIndex: number) => {
      const columnValue = temporaryValue.value[columnIndex]
      return (isObject(columnValue) ? (columnValue as IData).value : columnValue) as string | number
    }

    watch(
      () => innerValue.value,
      () => {
        if (!isEmpty(innerValue.value)) {
          temporaryValue.value = deepCopy(innerValue.value)
        }
        displayValue.value =
          findDisplayName(innerValue.value, formattedColumns.value, config.keys) ||
          (props.placeholder ?? '请选择')
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.options,
      () => {
        displayValue.value =
          findDisplayName(innerValue.value, formattedColumns.value, config.keys) ||
          (props.placeholder ?? '请选择')
        if (isEmpty(temporaryValue.value)) {
          if (isCascade.value) {
            temporaryValue.value = findCascadeFirstLevelData(
              props.options as ICascaderOption[],
              config.keys
            )
          } else {
            temporaryValue.value = isObject(props.options[0])
              ? ([(props.options[0] as PickerOption)?.value] as PickerValue)
              : (props.options.map((item) => (item as PickerOption[])[0]?.value) as PickerValue)
          }
        }
      }
    )

    watch(
      () => visible.value,
      (visible) => {
        innerVisible.value = visible
      }
    )

    return {
      innerVisible,
      className,
      contentClassName,
      triggerClassName,
      formattedColumns,
      contentStyle,
      isCascade,
      displayValue,
      showPicker,
      handleClose,
      handleChange,
      handleConfirm,
      formatColumnValue
    }
  }
})
</script>
