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
          v-for="(item, index) in innerColumns"
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
import { isObject } from '@xuanmo/javascript-utils'

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

    // 接收子级传递回来的数据
    const temporaryValue = ref<ValueType>(innerValue.value)

    const innerColumns = computed(() => {
      if (isObject(props.columns[0])) return [props.columns] as PickerColumnType[][]
      return props.columns as PickerColumnType[][]
    })

    const contentStyle = computed<CSSProperties>(() => ({
      height: `${props.optionHeight * 5}px`
    }))

    const handleClose = () => updateVisible(false)

    const onChange = (data: DataType, columnIndex: number) => {
      temporaryValue.value = temporaryValue.value.map((item, index) => {
        if (index === columnIndex) return data.value
        return item
      }) as ValueType
    }

    const handleChange = () => {
      updateValue(temporaryValue.value)
      handleClose()
    }

    return {
      visible,
      className,
      headerClassName,
      cancelBtnClassName,
      confirmBtnClassName,
      contentClassName,
      innerColumns,
      contentStyle,
      innerValue,
      temporaryValue,
      handleClose,
      onChange,
      handleChange
    }
  }
})
</script>
