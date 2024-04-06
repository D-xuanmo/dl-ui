<template>
  <ul v-if="store.searchResult.value.length" :class="wrapperClassName">
    <li
      v-for="item in store.searchResult.value"
      :key="item.id"
      :class="
        itemClassNames('search-item', {
          disabled: item.disabled
        })
      "
      @click="onChange(item.path)"
    >
      <span v-html="item.displayName" />
    </li>
  </ul>
  <div v-else :class="emptyClassName">无匹配选项</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createCascaderNameSpace } from './utils'
import { CASCADER_SEARCH_PANEL_PROPS } from './props'
import { ICascaderOption } from '@xuanmo/dl-common'
import { pickLastItem } from '@xuanmo/utils'

const [name, bem] = createCascaderNameSpace('search-panel')
const [, itemClassNames] = createCascaderNameSpace('search-item')
const [, emptyClassNames] = createCascaderNameSpace('search-empty')

export default defineComponent({
  name,
  props: CASCADER_SEARCH_PANEL_PROPS,
  setup(props) {
    const onChange = (path: ICascaderOption[]) => {
      if (pickLastItem(path).disabled) return
      props.store.updatePath(path)
      props.store.updateSearch('')
    }

    return {
      wrapperClassName: bem(),
      itemClassNames,
      emptyClassName: emptyClassNames(),
      onChange
    }
  }
})
</script>
