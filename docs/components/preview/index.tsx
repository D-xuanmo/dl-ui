import { defineComponent, PropType, ref } from 'vue'
import { createNamespace } from '@/utils/bem'
import './style.scss'

const [name, bem] = createNamespace('doc-preview')

const props = {
  restAttrs: String as PropType<string>
}

const DocPreview = defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const showCode = ref(false)
    const toggleCodeVisible = () => {
      showCode.value = !showCode.value
    }
    return () => {
      const { restAttrs } = props
      return (
        <div class={bem('wrapper')}>
          <div class={bem('runtime', { h5: restAttrs?.indexOf('h5') !== -1 })}>{slots.default?.()}</div>
          <div class={bem('toolbar', { active: showCode.value })}>
            <span onClick={toggleCodeVisible}>{!showCode.value ? '显示' : '隐藏'}代码</span>
          </div>
          <div class={bem('code', { active: showCode.value })}>{slots.code?.()}</div>
        </div>
      )
    }
  }
})

export default DocPreview
