<template>
  <d-search
    :model-value="store.searchKeywords.value"
    :class="className"
    :placeholder="searchPlaceholder"
    round
    @update:model-value="onChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DSearch from '../search'
import { createCascaderNameSpace } from './utils'
import { CASCADER_SEARCH_PROPS } from './props'
import { debounce } from '@xuanmo/utils'

const [name, bem] = createCascaderNameSpace('search')

export default defineComponent({
  name,
  components: { DSearch },
  props: CASCADER_SEARCH_PROPS,
  setup(props) {
    const className = bem()
    const onChange = debounce((value) => {
      props.store.updateSearch(value)
    }, 500)

    return {
      className,
      onChange
    }
  }
})
</script>
