import { defineComponent, ref, useSlots } from 'vue'
import PreviewOnly from '@doc/components/preview/preview-only'
import { createBEM, generatePlaygroundURL } from './utils'
import { DSpace } from '@xuanmo/dl-ui'
import CopyCode from '@doc/components/preview/copy-code'
import { CodeOutlined, CodeSandboxOutlined } from '@xuanmo/dl-icons'

export default defineComponent({
  name: 'DesktopPreview',
  props: {
    source: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    playground: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const slots = useSlots()
    const showCode = ref(false)

    const toggleCodeVisible = () => {
      showCode.value = !showCode.value
    }

    return () => (
      <section class={createBEM('desktop')}>
        <header class={createBEM('desktop-header')}>
          <h2 class={createBEM('desktop-title')}>{props.title}</h2>
          <DSpace class={createBEM('desktop-toolbar')} gap={10}>
            <a href={generatePlaygroundURL(props.playground)} title="在线编辑" target="_blank">
              <CodeSandboxOutlined size="small" />
            </a>
            <a href="javascript:;" title="复制代码">
              <CopyCode code={props.source} />
            </a>
            <a
              href="javascript:;"
              title={showCode.value ? '隐藏代码' : '查看代码'}
              onClick={toggleCodeVisible}
            >
              <CodeOutlined size="small" color={showCode.value ? 'var(--d-primary)' : undefined} />
            </a>
          </DSpace>
        </header>
        <PreviewOnly code={slots.default?.()} />
        <div
          class={createBEM('desktop-code', { active: showCode.value })}
          v-html={decodeURIComponent(props.source as string)}
        />
      </section>
    )
  }
})
