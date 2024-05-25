<template>
  <d-popup
    :visible="innerVisible"
    placement="bottom"
    :popup-container-class="bem({ [align]: align })"
    :popup-class="bem('wrapper')"
    :popup-body-class="[bem('body'), 'safe-area-inset-bottom']"
    @update:visible="onVisible"
  >
    <div v-if="description" :class="bem('description')">{{ description }}</div>
    <ul :class="bem('content')">
      <li
        v-for="(item, index) in options"
        :key="item[valueKey]"
        :class="bem('item')"
        @click="onSelected(item, index)"
      >
        <d-button
          block
          fill="none"
          :theme="item.status"
          shape="none"
          size="large"
          :disabled="item.disabled"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>
          {{ item[labelKey] }}
        </d-button>
      </li>
    </ul>
    <d-button
      v-if="showCancel"
      block
      fill="none"
      shape="rectangular"
      size="large"
      :class="bem('cancel')"
      @click="onClose"
    >
      {{ cancelButtonText }}
    </d-button>
  </d-popup>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import { createNamespace, DPopup, DButton, useModelValue, useConfig } from '@xuanmo/dl-common'
import { ACTION_SHEET_PROPS, ActionSheetProps } from './props'
import { IActionSheetOption } from './types'

const [name, bem] = createNamespace('action-sheet')

export default defineComponent({
  name,
  components: { DPopup, DButton },
  props: ACTION_SHEET_PROPS,
  emits: ['update:visible', 'close', 'selected'],
  setup(props, ctx: SetupContext) {
    const [innerVisible, setVisible] = useModelValue<boolean, ActionSheetProps, 'visible'>(
      props,
      ctx.emit,
      'visible',
      'update:visible'
    )
    const config = useConfig(['keys'], props)
    const valueKey = config.value.keys.value as 'value'
    const labelKey = config.value.keys.label as 'label'

    const onVisible = (value: boolean) => {
      setVisible(value)
    }

    const onClose = () => {
      setVisible(false)
      ctx.emit('close')
    }

    const onSelected = (item: IActionSheetOption, index: number) => {
      ctx.emit('selected', item, index)
      onClose()
    }

    return {
      bem,
      innerVisible,
      valueKey,
      labelKey,
      onVisible,
      onClose,
      onSelected
    }
  }
})
</script>
