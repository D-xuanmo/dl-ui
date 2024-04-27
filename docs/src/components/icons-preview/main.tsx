import { defineComponent, FunctionalComponent } from 'vue'
import { manifest } from '@xuanmo/dl-icons'
import { createNamespace } from '@doc/utils'
import { copyText } from '@doc/utils/copy'
import './style.scss'

console.log(manifest)
const [name, bem] = createNamespace('icons-preview')

type Icon = {
  name: string
  Comp: any
}

type ListItemProps = {
  data: Icon
}

const ListItem: FunctionalComponent<ListItemProps> = (props) => {
  const { Comp, name } = props.data

  const handleCopy = () => {
    copyText(name, `${name} 复制成功 🎉`)
  }

  return (
    <li class={bem('item')} onClick={handleCopy}>
      <Comp key={name} size="30px" />
      <p class={bem('item-title')}>{name}</p>
    </li>
  )
}

export default defineComponent({
  name,
  setup() {
    return () => {
      const filledIcons: Array<Icon> = []
      const outlinedIcons: Array<Icon> = []
      for (const [key, Comp] of Object.entries(manifest)) {
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
      const outlinedIconList = outlinedIcons.map((item) => <ListItem data={item} />)
      const filledIconList = filledIcons.map((item) => <ListItem data={item} />)
      return (
        <div class={bem()}>
          <div class={bem('list-wrapper')}>
            <p class={bem('list-title')}>线性图标</p>
            <ul class={bem('list')}>{outlinedIconList}</ul>
          </div>
          <div class={bem('list-wrapper')}>
            <p class={bem('list-title')}>面性图标</p>
            <ul class={bem('list')}>{filledIconList}</ul>
          </div>
        </div>
      )
    }
  }
})
