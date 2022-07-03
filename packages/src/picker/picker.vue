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
          :value="temporaryValue[index]"
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
import { PickerColumnType, pickerProps } from './props'
import DPickerItem from './picker-item.vue'
import { deepCopy, isObject } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('picker')

type ValueType = string[] | number[]

export default defineComponent({
  name,
  components: { DPickerItem },
  props: pickerProps,
  emits: ['update:visible', 'update:modelValue'],
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
        while (temporaryValue.value[level] && data) {
          if (!temporaryValue.value[level]) break
          const result = data.find((item) => item.value === temporaryValue.value[level]) ?? data[0]
          level++
          if (result) {
            formatted.push(data)
            temporaryValue.value[level - 1] = result.value
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

    const handleClose = () => updateVisible(false)

    const onChange = (data: DataType, columnIndex: number) => {
      // 级联选择模式切更改项为第一项，清空后续的值
      if (isCascade) {
        const newValue = temporaryValue.value
        newValue[columnIndex] = data.value
        temporaryValue.value = newValue
      } else {
        temporaryValue.value = temporaryValue.value.map((item, index) => {
          if (index === columnIndex) return data.value
          return item
        }) as ValueType
      }
    }

    const handleChange = () => {
      updateValue(deepCopy(temporaryValue.value))
      handleClose()
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
      handleClose,
      onChange,
      handleChange
    }
  }
})
</script>
