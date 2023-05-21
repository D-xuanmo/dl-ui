import { defineComponent } from 'vue'
import * as icons from '@xuanmo/dl-icons'
import { createNamespace } from '@doc/utils'
import './style.scss'

const [name, bem] = createNamespace('icons-preview')

type Icon = {
  name: string
  Comp: any
}

export default defineComponent({
  name,
  setup() {
    return () => {
      const filledIcons: Array<Icon> = []
      const outlinedIcons: Array<Icon> = []
      for (const [key, Comp] of Object.entries(icons)) {
        const item: Icon = {
          name: key,
          Comp
        }
        if (/Filled$/.exec(key)) {
          filledIcons.push(item)
        } else if (/Outlined$/.exec(key)) {
          outlinedIcons.push(item)
        }
      }
      const outlinedIconList = outlinedIcons.map((item) => {
        const { name, Comp } = item
        return (
          <li class={bem('item')}>
            <Comp key={name} size="30px" />
            <p class={bem('item', 'title', true)}>{name}</p>
          </li>
        )
      })
      const filledIconList = filledIcons.map((item) => {
        const { name, Comp } = item
        return (
          <li class={bem('item')}>
            <Comp key={name} size="30px" />
            <p class={bem('item', 'title', true)}>{name}</p>
          </li>
        )
      })
      return (
        <div class={bem()}>
          <div class={bem('list-wrapper')}>
            <p class={bem('list', 'title', true)}>线性图标</p>
            <ul class={bem('list')}>{outlinedIconList}</ul>
          </div>
          <div class={bem('list-wrapper')}>
            <p class={bem('list', 'title', true)}>面性图标</p>
            <ul class={bem('list')}>{filledIconList}</ul>
          </div>
        </div>
      )
    }
  }
})
