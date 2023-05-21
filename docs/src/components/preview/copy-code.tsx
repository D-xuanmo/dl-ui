import { computed, defineComponent, ref } from 'vue'
import { createBEM } from './utils'
import { showMessage } from '@xuanmo/dl-ui'
import CopyOutlined from '@doc/components/icons/copy-outlined'

export default defineComponent({
  name: 'CopyCode',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const status = ref<boolean | null>(null)

    const className = createBEM('copy')
    const scrollClassName = computed(() =>
      createBEM('copy-scroll', {
        success: status.value
      })
    )

    const handleCopy = () => {
      const el = document.createElement('div')
      el.innerHTML = decodeURIComponent(props.code)
      window.navigator.clipboard
        .writeText(el.innerText)
        .then(() => {
          showMessage({
            content: '复制成功',
            theme: 'success'
          })
        })
        .catch(() => {
          showMessage({
            content: '复制失败',
            theme: 'error'
          })
        })
      setTimeout(() => {
        status.value = null
      }, 2000)
    }

    return () => {
      return (
        <div class={className} onClick={handleCopy}>
          <div class={scrollClassName.value}>
            <span title="复制代码">
              <CopyOutlined size="small" />
            </span>
          </div>
        </div>
      )
    }
  }
})
