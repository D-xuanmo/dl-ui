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
import { createNamespace } from '../utils/bem'
import { SizeEnum } from '../common'
import useDefault from '../hooks/useDefault'
import DIcon from '../icon'
import { isBoolean, throwError, debugWarn } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('switch')
export default defineComponent({
  name,
  components: { DIcon },
  props: {
    value: {
      type: Boolean,
      default: undefined
    },
    modelValue: {
      type: Boolean,
      default: undefined
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
  emits: ['update:value', 'update:modelValue'],
  setup(props, { emit }) {
    const [innerValue, setValue] = useDefault<boolean, typeof props>(props, emit)

    const className = computed(() =>
      bem({
        [props.size]: props.size,
        active: innerValue.value,
        loading: props.loading,
        round: props.round
      })
    )

    const updateValue = () => setValue((innerValue.value = !innerValue.value))

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
