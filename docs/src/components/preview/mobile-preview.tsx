import { FunctionalComponent } from 'vue'
import { createBEM, generatePlaygroundURL } from './utils'
import CopyCode from './copy-code'
import PreviewOnly from '@doc/components/preview/preview-only'
import { DSpace } from '@xuanmo/dl-ui'
import { QrcodeOutlined, LinkOpenOutlined, CodeSandboxOutlined } from '@xuanmo/dl-icons'
import { When, If, Then, Else } from 'vue-if'

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
  const { sourceCode, playgroundKey, qrcodeImage, previewURL, previewType, title } = props
  const previewContent = (
    <If condition={previewType === 'iframe'}>
      <Then>
        <iframe src={`${previewURL}?preview=true`} />
      </Then>
      <Else>
        <PreviewOnly code={slots.default?.()} />
      </Else>
    </If>
  )
  const playgroundBtn = (
    <a href={generatePlaygroundURL(playgroundKey)} target="_blank" title="在 Playground 中编辑">
      <CodeSandboxOutlined />
    </a>
  )
  return (
    <div class={createBEM('mobile', { [previewType]: true })}>
      <div class={createBEM('mobile-content')}>
        <div class={createBEM('mobile-left')}>
          <div class={createBEM('mobile-toolbar')}>
            <DSpace justify="between">
              <h3>{title ?? playgroundBtn}</h3>
              <DSpace gap={16}>
                <When condition={title}>{playgroundBtn}</When>
                <a href="javascript:">
                  <CopyCode code={sourceCode} size="medium" />
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
                <LinkOpenOutlined />
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
