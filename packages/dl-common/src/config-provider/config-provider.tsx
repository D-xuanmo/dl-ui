import { createNamespace } from '../utils'
import { defineComponent, provide, SetupContext } from 'vue'
import { CONFIG_PROVIDER_PROPS } from './props'
import { ConfigProviderInjectKey } from './context'

const [name] = createNamespace('config-provider')

export default defineComponent({
  name,
  props: CONFIG_PROVIDER_PROPS,
  setup(props, context: SetupContext) {
    provide(ConfigProviderInjectKey, props)
    return () => context.slots.default?.()
  }
})
