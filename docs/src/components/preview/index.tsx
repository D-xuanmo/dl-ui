import { defineComponent, PropType, ref } from 'vue'
import { createNamespace } from '@/utils/bem'
import './style.scss'
import { useRoute } from 'vue-router'
import { PLAYGROUND_SHORT_URL } from '@doc/constants'
import { isNumber } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('doc-preview')

const props = {
  client: {
    type: String as PropType<'PC' | 'H5'>,
    default: 'H5'
  },
  source: { type: String, default: '' },
  playground: { type: String },
  preview: { type: Boolean },
  width: { type: Number },
  height: { type: Number }
}

const DocPreview = defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const route = useRoute()
    const showCode = ref(false)
    const toggleCodeVisible = () => {
      showCode.value = !showCode.value
    }
    return () => {
      const { client, source, playground, height, width } = props
      const isMobile = client?.toUpperCase() === 'H5'

      // PC 模版
      const pcContent =
        !isMobile && !playground ? (
          <>
            <div className={bem('runtime')}>{slots.default?.()}</div>
            <div className={bem('toolbar', { active: showCode.value })}>
              <span onClick={toggleCodeVisible}>{!showCode.value ? '显示' : '隐藏'}代码</span>
            </div>
            <div className={bem('code', { active: showCode.value })} v-html={decodeURIComponent(source)} />
          </>
        ) : null

      // H5 模版
      const mobileContent = isMobile ? (
        <div className={bem('out-content')}>
          <div className={bem('content')}>
            <div className={bem('code', { active: showCode.value })} v-html={decodeURIComponent(source)} />
            <div className={bem('runtime')}>
              <iframe src={`/demo${route.path}?preview=true`} />
            </div>
          </div>
          <div className={bem('toolbar')}>
            {playground && (
              <a href={playground} target="_blank">
                <d-button fill="none">在线编辑</d-button>
              </a>
            )}
          </div>
        </div>
      ) : null

      // 演练场
      const playgroundContent =
        playground !== 'undefined' ? (
          <div
            className={bem('playground')}
            style={{
              width: isNumber(width) ? `${width}px` : width,
              height: isNumber(height) ? `${height}px` : height
            }}
          >
            <iframe src={`${PLAYGROUND_SHORT_URL}${playground}`} />
          </div>
        ) : null

      return (
        <div class={bem('wrapper', { h5: isMobile })}>
          {pcContent}
          {mobileContent}
          {playgroundContent}
        </div>
      )
    }
  }
})

export default DocPreview
