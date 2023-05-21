import copyIcon from '../../assets/images/copy.svg'
import { computed, defineComponent, ref } from 'vue'
import { CloseFilled, CheckCircleFilled } from '@xuanmo/dl-icons'
import { createBEM } from './utils'
import { showMessage } from '@xuanmo/dl-ui'

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
    const statusColor = ref('var(--d-success)')

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
          status.value = true
          statusColor.value = 'var(--d-success)'
          showMessage({
            content: '复制成功',
            theme: 'success'
          })
        })
        .catch(() => {
          status.value = false
          statusColor.value = 'var(--d-error)'
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
      const successIcon = status.value && <CheckCircleFilled color={statusColor.value} />
      const failIcon = status.value === false && <CloseFilled color={statusColor.value} />
      return (
        <div class={className} onClick={handleCopy}>
          <div class={scrollClassName.value}>
            <img src={copyIcon} title="复制代码" />
            {successIcon}
            {failIcon}
          </div>
        </div>
      )
    }
  }
})
