import { FunctionalComponent } from 'vue'
import { createBEM, generatePlaygroundURL } from './utils'
import CopyCode from './copy-code'
import CodeSandbox from '@doc/components/icons/code-sandbox'
import PreviewOnly from '@doc/components/preview/preview-only'
import { DSpace } from '@xuanmo/dl-ui'
import BrowserOutlined from '@doc/components/icons/browser-outlined'
import { QrcodeOutlined } from '@xuanmo/dl-icons'

type MobilePreviewProps = {
  // 源码
  sourceCode: string

  // 二维码图片地址
  qrcodeImage: string

  previewURL: string

  // 预览模式
  previewType: 'iframe' | 'self'

  title: string

  playgroundKey: string
}

const MobilePreview: FunctionalComponent<MobilePreviewProps, any> = (props, { slots }) => {
  const {
    sourceCode,
    playgroundKey,
    qrcodeImage,
    previewURL,
    previewType,
    title = '代码演示'
  } = props
  const previewContent =
    previewType === 'iframe' ? (
      <iframe src={`${previewURL}?preview=true`} />
    ) : (
      <PreviewOnly code={slots.default?.()} />
    )
  return (
    <div class={createBEM('mobile', { [previewType]: true })}>
      <div class={createBEM('mobile-content')}>
        <div class={createBEM('mobile-left')}>
          <div class={createBEM('mobile-toolbar')}>
            <DSpace justify="between">
              <h3>{title}</h3>
              <DSpace gap={16}>
                {playgroundKey && (
                  <a
                    href={generatePlaygroundURL(playgroundKey)}
                    target="_blank"
                    title="在 Playground 中编辑"
                  >
                    <CodeSandbox />
                  </a>
                )}
                <a href="javascript:">
                  <CopyCode code={sourceCode} />
                </a>
              </DSpace>
            </DSpace>
          </div>
          <div class={createBEM('mobile-code')} v-html={decodeURIComponent(sourceCode as string)} />
        </div>
        <div class={createBEM('mobile-runtime')}>
          <div class={createBEM('mobile-runtime-inner')}>{previewContent}</div>
          <div class={createBEM('mobile-toolbar')}>
            <DSpace justify="end" gap={16}>
              <a href={`${previewURL}?preview=true`} target="_blank">
                <BrowserOutlined />
              </a>
              <div class={createBEM('qrcode')}>
                <QrcodeOutlined class={createBEM('qrcode-trigger')} />
                <div class={createBEM('qrcode-img')}>
                  <img src={qrcodeImage} />
                </div>
              </div>
            </DSpace>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobilePreview
