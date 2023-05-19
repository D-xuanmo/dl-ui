import { defineComponent, CSSProperties, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { PLAYGROUND_SHORT_URL } from '@doc/constants'
import QRCode from 'qrcode'
import qs from 'qs'
import qrcodeIcon from '../../assets/images/QRCode.svg'
import playgroundIcon from '../../assets/images/CodeSandbox.svg'
import CopyCode from './copy-code.vue'
import './style.scss'
import { createNamespace } from '@doc/utils'
import { utils } from '@xuanmo/dl-ui'

const [name, bem] = createNamespace('doc-preview')

const props = {
  params: String,
  source: String
}

const DocPreview = defineComponent({
  name,
  components: {
    'copy-code': CopyCode
  },
  props,
  setup(props, { slots }) {
    const route = useRoute()
    const showCode = ref(false)
    const qrcode = ref('')
    const playgroundRef = ref<HTMLIFrameElement | null>(null)
    const demoURL = ref('')

    watch(
      () => route,
      () => {
        const name = route.path.match(/\/([\w-]+)$/)?.[1]
        demoURL.value = `${window.location.origin}${import.meta.env.BASE_URL.replace(
          /\/$/,
          ''
        )}/demo/${name}`
        QRCode.toDataURL(demoURL.value).then((url) => {
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

      const wrapperStyle = {
        width: utils.addUnit(width as string),
        height: utils.addUnit(height as string)
      } as CSSProperties

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
              <iframe src={`${demoURL.value}?preview=true`} />
            </div>
          </div>
          <div className={bem('toolbar')}>
            <d-space>
              <copy-code code={props.source} />
            </d-space>
            <d-space gap={10}>
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
            </d-space>
          </div>
        </div>
      ) : null

      // 演练场
      const playgroundContent =
        playground && !isMobile ? (
          <div className={bem('playground')}>
            <iframe ref={playgroundRef} src={`${PLAYGROUND_SHORT_URL}${playground}`} />
          </div>
        ) : null

      return (
        <div class={bem('wrapper', { h5: isMobile })} style={wrapperStyle}>
          {pcContent}
          {mobileContent}
          {playgroundContent}
        </div>
      )
    }
  }
})

export default DocPreview
