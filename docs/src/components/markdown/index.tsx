import { defineComponent } from 'vue'
import { createNamespace } from '@doc/utils'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const [name, bem] = createNamespace('markdown')

export default defineComponent({
  name,
  setup(props, { slots }) {
    return () => {
      const content = slots.default?.()[0].children as string
      return <div class={bem()} innerHTML={md.render(content)} />
    }
  }
})
