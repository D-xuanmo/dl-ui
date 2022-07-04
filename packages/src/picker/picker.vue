<template>
  <d-popup
    :visible="visible"
    placement="bottom"
    @update:visible="handleClose"
  >
    <div :class="className">
      <header :class="headerClassName">
        <span
          v-if="cancelButtonText"
          :class="cancelBtnClassName"
          @touchstart="handleClose"
        >
          {{ cancelButtonText }}
        </span>
        <span>{{ title }}</span>
        <span
          v-if="confirmButtonText"
          :class="confirmBtnClassName"
          @click="handleChange"
        >
          {{ confirmButtonText }}
        </span>
      </header>

      <div
        :class="contentClassName"
        :style="contentStyle"
      >
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
import { PickerColumnType, pickerProps, ValueType } from './props'
import DPickerItem from './picker-item.vue'
import { deepCopy, isObject } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('picker')

export default defineComponent({
  name,
  components: { DPickerItem },
  props: pickerProps,
  emits: ['update:visible', 'update:modelValue', 'confirm', 'close'],
  setup(props, context: SetupContext) {
    const className = bem()
    const headerClassName = bem('header')
    const cancelBtnClassName = bem('header', 'cancel', true)
    const confirmBtnClassName = bem('header', 'confirm', true)
    const contentClassName = bem('content')

    const [visible, updateVisible] = useDefault<boolean, OmitValueProperties<typeof props>, 'visible'>(
      props as OmitValueProperties<typeof props>,
      context.emit,
      'visible',
      'update:visible'
    )

    const [innerValue, updateValue] = useDefault<ValueType, typeof props>(props, context.emit)

    // 是否为级联选择模式
    const isCascade = Array.isArray((props.columns as PickerColumnType[])[0].children)

    // 接收子级传递回来的数据
    const temporaryValue = ref<ValueType>(deepCopy(innerValue.value))

    // 处理级联数据
    const formatCascade = (columns: PickerColumnType[]) => {
      const formatted: PickerColumnType[][] = []
      let level = 0
      function findColumns(data: PickerColumnType[]) {
        const value = temporaryValue.value
        while (value[level] && data) {
          if (!value[level]) break
          const result =
            data.find((item) => {
              const current = value[level]
              // 传入的 value 为对象数组，取 value 属性
              return item.value === (isObject(current) ? (current as DataType).value : current)
            }) ?? data[0]
          level++
          if (result) {
            formatted.push(data)
            temporaryValue.value[level - 1] = result
            result?.children && findColumns(result?.children)
            break
          }
        }
      }
      findColumns(columns)
      return formatted
    }

    // 内部渲染列使用
    const formattedColumns = computed(() => {
      if (isCascade) return formatCascade(props.columns as PickerColumnType[])

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
        }) as ValueType
      }
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
