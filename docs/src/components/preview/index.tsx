import { defineComponent, CSSProperties, ref, watch } from 'vue'
import { createNamespace } from '@/utils/bem'
import { useRoute } from 'vue-router'
import { PLAYGROUND_SHORT_URL } from '@doc/constants'
import { isNumber } from '@xuanmo/javascript-utils'
import QRCode from 'qrcode'
import qs from 'qs'
import qrcodeIcon from '../../assets/images/QRCode.svg'
import playgroundIcon from '../../assets/images/CodeSandbox.svg'
import './style.scss'

const [name, bem] = createNamespace('doc-preview')

const props = {
  params: String,
  source: String
}

const DocPreview = defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const route = useRoute()
    const showCode = ref(false)
    const qrcode = ref('')

    watch(
      () => route,
      () => {
        const name = route.path.match(/\/(\w+)$/)?.[1]
        QRCode.toDataURL(`https://www.xuanmo.xin/-/dynamic-form/demo/${name}`).then((url) => {
          qrcode.value = url
        })
      },
      {
        immediate: true
      }
    )

    return () => {
      const { client = 'PC', playground, height, width } = qs.parse(props.params!)
      const isMobile = client === 'Mobile'

      const toggleCodeVisible = () => {
        showCode.value = !showCode.value
      }

      // PC 模版
      const pcContent =
        !isMobile && !playground ? (
          <>
            <div className={bem('runtime')}>{slots.default?.()}</div>
            <div className={bem('toolbar', { active: showCode.value })}>
              <span onClick={toggleCodeVisible}>{!showCode.value ? '显示' : '隐藏'}代码</span>
            </div>
            <div
              className={bem('code', { active: showCode.value })}
              v-html={decodeURIComponent(props.source as string)}
            />
          </>
        ) : null

      // H5 模版
      const mobileContent = isMobile ? (
        <div className={bem('out-content')}>
          <div className={bem('content')}>
            <div
              className={bem('code', { active: showCode.value })}
              v-html={decodeURIComponent(props.source as string)}
            />
            <div className={bem('runtime')}>
              <iframe src={`/demo${route.path}?preview=true`} />
            </div>
          </div>
          <div className={bem('toolbar')}>
            <div className={bem('qrcode')}>
              <img className={bem('qrcode-trigger')} src={qrcodeIcon} />
              <div className={bem('qrcode-img')}>
                <img src={qrcode.value} />
              </div>
            </div>
            {playground && (
              <a
                href={`${PLAYGROUND_SHORT_URL}${playground}`}
                target="_blank"
                title="在 Playground 中编辑"
              >
                <img src={playgroundIcon} />
              </a>
            )}
          </div>
        </div>
      ) : null

      // 演练场
      const playgroundContent =
        playground && !isMobile ? (
          <div
            className={bem('playground')}
            style={
              {
                width: isNumber(width) ? `${width}px` : width,
                height: isNumber(height) ? `${height}px` : height
              } as CSSProperties
            }
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
