<template>
  <d-layout>
    <d-layout-header
      v-if="headerModel"
      :height="headerModel?.layout.height"
      :border="headerModel?.layout.border"
    >
      <form-layout-header :model="headerModel" />
    </d-layout-header>
    <template v-for="item in children" :key="item.id">
      <d-layout-sider
        v-if="item.component === 'DFormLayoutSider'"
        :width="item.layout.width"
        :border="item.layout.border"
        :collapsed="item.layout.collapsed"
        :collapsed-width="item.layout.collapsedWidth"
        :placement="item.layout.placement"
      >
        <form-layout-sider :model="item" />
      </d-layout-sider>
      <d-layout-content v-if="item.component === 'DFormLayoutContent'">
        <form-layout-content :model="item" />
      </d-layout-content>
    </template>
    <d-layout-footer
      v-if="footerModel"
      :height="footerModel?.layout.height"
      :border="footerModel?.layout.border"
    >
      <form-layout-footer :model="footerModel" />
    </d-layout-footer>
  </d-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../../utils'
import {
  DLayout,
  DLayoutHeader,
  DLayoutFooter,
  DLayoutSider,
  DLayoutContent,
  LayoutHeaderProps,
  LayoutFooterProps
} from '../../../layout'
import { useLinkChildren } from '../../hooks/use-link-children'
import { IRenderModel } from '../../types'
import FormLayoutHeader from './header.vue'
import FormLayoutFooter from './footer.vue'
import FormLayoutSider from './sider.vue'
import FormLayoutContent from './content.vue'

const [name] = createNamespace('form-layout')

type Props = {
  header: boolean
  footer: boolean
}

export default defineComponent({
  name,
  components: {
    DLayout,
    DLayoutHeader,
    DLayoutFooter,
    DLayoutSider,
    DLayoutContent,
    FormLayoutHeader,
    FormLayoutFooter,
    FormLayoutSider,
    FormLayoutContent
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel<Props>>,
      default: () => ({})
    }
  },
  setup(props) {
    const children = useLinkChildren(props.model.layout.children)
    const headerModel: IRenderModel<LayoutHeaderProps> | undefined = children.value.find(
      (item) => item.component === 'DFormLayoutHeader'
    )
    const footerModel: IRenderModel<LayoutFooterProps> | undefined = children.value.find(
      (item) => item.component === 'DFormLayoutFooter'
    )

    return {
      children: children.value.filter((item) =>
        ['DFormLayoutSider', 'DFormLayoutContent'].includes(item.component as any)
      ),
      headerModel,
      footerModel
    }
  }
})
</script>
