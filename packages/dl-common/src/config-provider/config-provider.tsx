import { createNamespace } from '../utils'
import { computed, CSSProperties, defineComponent, provide, SetupContext } from 'vue'
import { CONFIG_PROVIDER_PROPS } from './props'
import { ConfigProviderInjectKey } from './context'

const [name, bem] = createNamespace('config-provider')

export default defineComponent({
  name,
  props: CONFIG_PROVIDER_PROPS,
  setup(props, context: SetupContext) {
    provide(ConfigProviderInjectKey, props)

    const style = computed<CSSProperties>(() => ({
      '--d-primary': props.theme?.primary,
      '--d-success': props.theme?.success,
      '--d-warning': props.theme?.warning,
      '--d-error': props.theme?.error
    }))

    return () => (
      <div class={bem()} style={style.value}>
        {context.slots.default?.()}
      </div>
    )
  }
})
