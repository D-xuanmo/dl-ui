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
import DesktopPreview from '@doc/components/preview/desktop-preview'

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
    const qrcode = ref('')
    const demoURL = ref('')
    const {
      client = 'PC',
      playground,
      height,
      width,
      preview,
      previewType = 'self',
      secondPath,
      title
    } = qs.parse(props.params!) as any
    const isMobile = client === 'Mobile'

    watch(
      () => route,
      () => {
        const name = route.path.match(/\/([\w-]+)$/)?.[1]
        demoURL.value = `${window.location.origin}${import.meta.env.BASE_URL.replace(
          /\/$/,
          ''
        )}/demo/${name}${secondPath ? `/${secondPath}` : ''}`
        QRCode.toDataURL(demoURL.value).then((url) => {
          qrcode.value = url
        })
      },
      {
        immediate: true
      }
    )

    return () => {
      const wrapperStyle = {
        width: addUnit(width),
        height: addUnit(height)
      } as CSSProperties

      let content = null

      if (preview) {
        content = <PreviewOnly code={slots.default?.()} />
      } else {
        if (['PC', undefined].includes(client)) {
          content = (
            <DesktopPreview source={props.source} title={title} playground={playground}>
              {slots.default?.()}
            </DesktopPreview>
          )
        } else if (isMobile) {
          content = (
            <MobilePreview
              title={title}
              sourceCode={props.source!}
              previewURL={demoURL.value}
              previewType={previewType}
              qrcodeImage={qrcode.value}
              playgroundKey={playground}
            >
              {slots.default?.()}
            </MobilePreview>
          )
        } else if (playground && !isMobile) {
          content = <Playground playgroundKey={playground} />
        }
      }

      return (
        <div class={bem('wrapper')} style={wrapperStyle}>
          {content}
        </div>
      )
    }
  }
})

export default DocPreview
