import { createNamespace } from '../utils'
import { defineComponent, provide, SetupContext } from 'vue'
import { CONFIG_PROVIDER_PROPS } from './props'
import { ConfigProviderInjectKey } from './context'
import { useStyle } from './use-style'

const [name, bem] = createNamespace('config-provider')

export default defineComponent({
  name,
  props: CONFIG_PROVIDER_PROPS,
  setup(props, context: SetupContext) {
    provide(ConfigProviderInjectKey, props)

    const style = useStyle(props)

    return () => (
      <div class={bem()} style={style.value}>
        {context.slots.default?.()}
      </div>
    )
  }
})
