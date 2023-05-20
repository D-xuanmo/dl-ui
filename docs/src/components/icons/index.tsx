import { defineComponent } from 'vue'
import * as icons from '@xuanmo/dl-icons'

export default defineComponent({
  setup() {
    return () => {
      const iconList = Object.keys(icons).reduce((prev: any, current: any) => {
        const Comp = (icons as any)[current]
        return [...prev, <Comp />]
      }, [])
      console.log({ iconList })
      return <span>{iconList}</span>
    }
  }
})
