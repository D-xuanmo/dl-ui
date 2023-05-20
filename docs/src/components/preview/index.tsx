import { defineComponent, CSSProperties, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import qs from 'qs'
import { createNamespace } from '@doc/utils'
import { addUnit } from '@xuanmo/dl-common'
import Playground from '@doc/components/preview/playground'
import MobilePreview from '@doc/components/preview/mobile-preview'
import PreviewOnly from '@doc/components/preview/preview-only'
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
      const { client = 'PC', playground, height, width, preview } = qs.parse(props.params!)
      const isMobile = client === 'Mobile'

      const wrapperStyle = {
        width: addUnit(width as string),
        height: addUnit(height as string)
      } as CSSProperties

      const toggleCodeVisible = () => {
        showCode.value = !showCode.value
      }

      let content = null

      if (preview) {
        content = <PreviewOnly code={slots.default?.()} />
      } else {
        if (!isMobile && !playground) {
          content = (
            <>
              <PreviewOnly code={slots.default?.()} />
              <div class={bem('toolbar', { active: showCode.value })}>
                <span style={{ cursor: 'pointer' }} onClick={toggleCodeVisible}>
                  {!showCode.value ? '显示' : '隐藏'}代码
                </span>
              </div>
              <div
                class={bem('code', { active: showCode.value })}
                v-html={decodeURIComponent(props.source as string)}
              />
            </>
          )
        } else if (isMobile) {
          content = (
            <MobilePreview
              sourceCode={props.source!}
              previewURL={demoURL.value}
              qrcodeImage={qrcode.value}
              playgroundKey={playground as string}
            />
          )
        } else if (playground && !isMobile) {
          content = <Playground playgroundKey={playground as string} />
        }
      }

      return (
        <div class={bem('wrapper', { h5: isMobile })} style={wrapperStyle}>
          {content}
        </div>
      )
    }
  }
})

export default DocPreview
