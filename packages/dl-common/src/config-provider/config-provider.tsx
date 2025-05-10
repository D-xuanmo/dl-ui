import { createNamespace } from '../utils'
import { computed, defineComponent, provide, SetupContext } from 'vue'
import { CONFIG_PROVIDER_PROPS } from './props'
import { ConfigProviderInjectKey } from './context'
import { useTheme } from './use-style'
import { useConfig } from '../hooks'

const [name, bem] = createNamespace('config-provider')

export default defineComponent({
  name,
  props: CONFIG_PROVIDER_PROPS,
  setup(props, context: SetupContext) {
    const config = useConfig(['renderFormLabel', 'useCustomDescription', 'renderCellTitle'], props)

    provide(
      ConfigProviderInjectKey,
      computed(() => ({
        ...props,
        renderFormLabel: config.value.renderFormLabel,
        useCustomDescription: config.value.useCustomDescription,
        renderCellTitle: config.value.renderCellTitle
      }))
    )

    const theme = useTheme(props)
    const style = {
      height: props.fullHeight ? '100%' : undefined
    }

    if (props.isRoot) {
      const htmlEl = document.querySelector('html')
      if (htmlEl) {
        for (const [key, value] of Object.entries(theme.value)) {
          htmlEl.style.setProperty(key, value)
        }
      }
    } else {
      Object.assign(style, theme.value)
    }

    if (!props.createNode) return () => context.slots.default?.()

    return () => (
      <div class={bem()} style={style}>
        {context.slots.default?.()}
      </div>
    )
  }
})
