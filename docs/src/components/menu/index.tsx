import { defineComponent, PropType } from 'vue'
import { MenuItemType } from '@doc/components/menu/types'
import { format } from './format'
import { useRoute, useRouter } from 'vue-router'
import { createNamespace } from '@doc/utils'
import './style.scss'

const [name, bem] = createNamespace('menu')

const props = {
  data: {
    type: Array as PropType<MenuItemType[]>,
    required: true as const
  }
}

const Menu = defineComponent({
  name,
  props,
  setup(props) {
    return () => {
      const { data } = props
      const router = useRouter()
      const route = useRoute()

      const renderItems = data?.map((item) => {
        const { id, content, path, groupTitle, children } = item
        const { name: componentName, describe } = format(content ?? '')
        // 如果有子级则递归执行自己
        const subMenu = Array.isArray(children) ? (
          <>
            <p class={bem('item-group-title')}>{groupTitle}</p>
            <Menu data={children} class={bem('sub-menu')} />
          </>
        ) : null

        const openPage = () => router.push(path ?? '')

        return (
          <li key={id} class={bem('item', { active: route.path === path })}>
            {content && (
              <p class={bem('item-link')} onClick={openPage}>
                <span class={bem('item-link-title')}>{componentName}</span>
                <span class={bem('item-link-describe')}>{describe}</span>
              </p>
            )}
            {subMenu}
          </li>
        )
      })

      return <ul class={bem('wrapper')}>{renderItems}</ul>
    }
  }
})

export default Menu

declare module 'vue' {
  export interface GlobalComponents {
    DMenu: typeof Menu
  }
}
