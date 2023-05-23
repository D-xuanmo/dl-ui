import { defineComponent } from 'vue'
import CopyOutlined from '@doc/components/icons/copy-outlined'
import { copyText } from '@doc/utils/copy'

export default defineComponent({
  name: 'CopyCode',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const handleCopy = () => {
      const el = document.createElement('div')
      el.innerHTML = decodeURIComponent(props.code)
      copyText(el.innerText)
    }

    return () => {
      return (
        <span title="复制代码" onClick={handleCopy}>
          <CopyOutlined size="small" />
        </span>
      )
    }
  }
})
