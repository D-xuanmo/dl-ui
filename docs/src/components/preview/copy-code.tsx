import { defineComponent, PropType } from 'vue'
import { copyText } from '@doc/utils/copy'
import { CopyOutlined } from '@xuanmo/dl-icons'
import { SizeEnum } from '@xuanmo/dl-common'

export default defineComponent({
  name: 'CopyCode',
  props: {
    code: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: 'small'
    }
  },
  setup(props) {
    const handleCopy = () => {
      const el = document.createElement('div')
      el.innerHTML = decodeURIComponent(props.code)
      copyText(el.innerText)
    }

    return () => {
      return <CopyOutlined size={props.size} onClick={handleCopy} />
    }
  }
})
