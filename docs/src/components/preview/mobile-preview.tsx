import { FunctionalComponent } from 'vue'
import qrcodeIcon from '@doc/assets/images/QRCode.svg'
import { createBEM, generatePlaygroundURL } from './utils'
import CopyCode from './copy-code'
import CodeSandbox from '@doc/components/icons/code-sandbox'

type MobilePreviewProps = {
  // 源码
  sourceCode: string

  // 二维码图片地址
  qrcodeImage: string

  previewURL: string

  playgroundKey: string
}

const MobilePreview: FunctionalComponent<MobilePreviewProps> = (props) => {
  const { sourceCode, playgroundKey, qrcodeImage, previewURL } = props
  return (
    <div class={createBEM('out-content')}>
      <div class={createBEM('content')}>
        <div class={createBEM('code')} v-html={decodeURIComponent(sourceCode as string)} />
        <div class={createBEM('runtime')}>
          <iframe src={`${previewURL}?preview=true`} />
        </div>
      </div>
      <div class={createBEM('toolbar')}>
        <d-space>
          <CopyCode code={sourceCode} />
        </d-space>
        <d-space gap={10}>
          <div class={createBEM('qrcode')}>
            <img class={createBEM('qrcode-trigger')} src={qrcodeIcon} />
            <div class={createBEM('qrcode-img')}>
              <img src={qrcodeImage} />
            </div>
          </div>
          {playgroundKey && (
            <a
              href={generatePlaygroundURL(playgroundKey)}
              target="_blank"
              title="在 Playground 中编辑"
            >
              <CodeSandbox />
            </a>
          )}
        </d-space>
      </div>
    </div>
  )
}

export default MobilePreview
