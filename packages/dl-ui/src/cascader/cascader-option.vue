<template>
  <div :class="className" @click="onChange">
    <span>{{ option[store.labelKey] }}</span>
    <loading-outlined
      v-if="store.getLoading(option.value)"
      spin
      size="medium"
      color="var(--d-primary)"
    />
    <check-outlined v-if="active" size="large" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createCascaderNameSpace } from './utils'
import { CASCADER_OPTION_ITEM_PROPS } from './props'
import { CheckOutlined, LoadingOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createCascaderNameSpace('option')

export default defineComponent({
  name,
  components: { CheckOutlined, LoadingOutlined },
  props: CASCADER_OPTION_ITEM_PROPS,
  emits: ['change'],
  setup(props, ctx) {
    const className = computed(() =>
      bem('option', {
        active: props.active,
        disabled: props.option.disabled
      })
    )

    const onChange = () => {
      ctx.emit('change', props.option)
    }

    return {
      className,
      onChange
    }
  }
})
</script>
