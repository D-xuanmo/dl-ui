<template>
  <button
    :class="className"
    :disabled="disabled"
    @click="handleChange"
  >
    <div :class="bem('handle', { active: innerValue })">
      <slot name="icon">
        <DIcon
          v-if="loading"
          name="loading"
          spin
          size="small"
          color="var(--d-primary)"
        />
      </slot>
      <slot
        v-if="innerValue"
        name="checked-icon"
      ></slot>
      <slot
        v-if="!innerValue"
        name="unchecked-icon"
      ></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { isPromise } from '@vue/shared'
import { createNamespace } from '@/utils/bem'
import { SizeEnum } from '@/common'
import useDefault from '@/hooks/useDefault'
import DIcon from '../icon'
import { isBoolean, throwError, debugWarn } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('switch')
export default defineComponent({
  name,
  components: { DIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: 'medium'
    },
    loading: Boolean,
    disabled: Boolean,
    round: {
      type: Boolean,
      default: true
    },
    beforeChange: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const [innerValue] = useDefault<boolean, typeof props>(props)

    const className = computed(() =>
      bem({
        [props.size]: props.size,
        active: innerValue.value,
        loading: props.loading,
        round: props.round
      })
    )

    const updateValue = () => emit('update:modelValue', (innerValue.value = !innerValue.value))

    function handleChange() {
      if (props.loading) return

      const { beforeChange } = props
      if (!beforeChange) {
        updateValue()
        return
      }

      const interceptionResult = beforeChange()

      if (![isPromise(interceptionResult), isBoolean(interceptionResult)].some((i) => i)) {
        throwError(name, 'beforeChange 返回值必须为 `Promise<boolean>` 或者 `boolean`')
      }

      if (isPromise(interceptionResult)) {
        interceptionResult.then((result) => result && updateValue()).catch((e) => debugWarn(name, e))
      } else if (interceptionResult) {
        updateValue()
      }
    }

    return {
      bem,
      className,
      innerValue,
      handleChange
    }
  }
})
</script>
