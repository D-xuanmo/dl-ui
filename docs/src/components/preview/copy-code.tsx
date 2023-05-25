import { defineComponent } from 'vue'
import { copyText } from '@doc/utils/copy'
import { CopyOutlined } from '@xuanmo/dl-icons'

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
