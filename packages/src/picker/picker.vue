<template>
  <d-popup :visible="visible" placement="bottom" @update:visible="handleClose">
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
import { computed, CSSProperties, defineComponent, ref, SetupContext } from 'vue'
import { createNamespace } from '../utils/bem'
import useDefault from '../hooks/useDefault'
import { DataType, OmitValueProperties } from '../common'
import { CascadeDataType, PickerColumnType, pickerProps, PickerValueType } from './props'
import DPickerItem from './picker-item.vue'
import { deepCopy, isObject } from '@xuanmo/javascript-utils'
import { formatCascade } from './utils'
import { EventType } from './types'

const [name, bem] = createNamespace('picker')

export default defineComponent({
  name,
  components: { DPickerItem },
  props: pickerProps,
  emits: ['update:visible', 'update:modelValue', 'update:value', 'change', 'confirm', 'close'],
  setup(props, context: SetupContext<EventType>) {
    const className = bem()
    const headerClassName = bem('header')
    const cancelBtnClassName = bem('header', 'cancel', true)
    const confirmBtnClassName = bem('header', 'confirm', true)
    const contentClassName = bem('content')

    const [visible, updateVisible] = useDefault<boolean, OmitValueProperties<typeof props>, 'visible', EventType>(
      props as OmitValueProperties<typeof props>,
      context.emit,
      'visible',
      'update:visible'
    )

    const [innerValue, updateValue] = useDefault<PickerValueType, typeof props, EventType>(props, context.emit)

    // 是否为级联选择模式
    const isCascade = Array.isArray((props.columns[0] as CascadeDataType)?.children)

    // 接收子级传递回来的数据
    const temporaryValue = ref<PickerValueType>(deepCopy(innerValue.value))

    // 内部渲染列使用
    const formattedColumns = computed(() => {
      if (isCascade) return formatCascade(temporaryValue.value, props.columns as CascadeDataType[])

      if (isObject(props.columns[0])) return [props.columns] as PickerColumnType[][]

      return props.columns as PickerColumnType[][]
    })

    const contentStyle = computed<CSSProperties>(() => ({
      height: `${props.optionHeight * 5}px`
    }))

    const onChange = (data: DataType, columnIndex: number) => {
      // 级联选择模式切更改项为第一项，清空后续的值
      if (isCascade) {
        temporaryValue.value[columnIndex] = data
      } else {
        temporaryValue.value = temporaryValue.value.map((item, index) => {
          if (index === columnIndex) return data
          return item
        }) as PickerValueType
      }
      context.emit('change', temporaryValue.value, data)
    }

    const handleChange = () => {
      const value = isCascade ? deepCopy(temporaryValue.value) : [(temporaryValue.value as DataType[])?.[0]?.value]
      updateValue(value)
      handleClose()
      context.emit('confirm', temporaryValue.value)
    }

    const handleClose = () => {
      updateVisible(false)
      context.emit('close')
    }

    const formatColumnValue = (columnIndex: number) => {
      const columnValue = temporaryValue.value[columnIndex]
      return (isObject(columnValue) ? (columnValue as DataType).value : columnValue) as string | number
    }

    return {
      visible,
      className,
      headerClassName,
      cancelBtnClassName,
      confirmBtnClassName,
      contentClassName,
      formattedColumns,
      contentStyle,
      temporaryValue,
      isCascade,
      isObject,
      handleClose,
      onChange,
      handleChange,
      formatColumnValue
    }
  }
})
</script>
