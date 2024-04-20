import { ref } from 'vue'
import { createRandomID } from '@xuanmo/utils'

export type AnchorItem = {
  id: string
  content: string
  link: string
  children: AnchorItem[]
}

class DocStore {
  anchorList = ref<AnchorItem[]>([])

  updateAnchorList() {
    const titleClass = Array.from({ length: 6 })
      .map((_, index) => `.dl-doc__content .markdown-body > h${index + 1}:not(h1)`)
      .join(',')
    const nodeList = document.querySelectorAll(titleClass) as unknown as HTMLElement[]
    const formatted = Array.from(nodeList).map((item) => {
      item.setAttribute('id', item.innerText)
      return {
        level: +item.tagName.replace(/h/i, ''),
        content: item.innerText,
        id: createRandomID(6),
        link: `#${item.innerText}`,
        children: []
      }
    })
    const offset = -(formatted[0]?.level || 2)
    const result: AnchorItem[] = []
    const levels = [{ children: result }]
    formatted.forEach((item) => {
      levels[item.level + offset].children = levels[item.level + offset].children || []
      levels[item.level + offset].children.push((levels[item.level + offset + 1] = item) as any)
    })
    this.anchorList.value = result
  }
}

const docStore = new DocStore()

export { DocStore, docStore }
