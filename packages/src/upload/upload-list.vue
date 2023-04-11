<template>
  <div :class="wrapperClassName">
    <div v-for="(item, index) in list" :key="`${item.url}@${index}`" :class="itemClassName">
      <d-image
        :src="item.url"
        :width="previewSize"
        :height="previewSize"
        :show-loading="item.loading"
        :show-error="item.fail"
        :error-text="item.fail ? '上传失败' : undefined"
      />
      <d-icon
        v-if="deletable && item.deletable"
        name="close-f"
        size="small"
        :class="itemCloseClassName"
        @click="handleDeleteItem(index, item)"
      />
    </div>
    <div :class="itemClassName">
      <slot name="trigger" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createUploadNameSpace } from './utils'
import { UploadListItemType, uploadListProps } from './props'
import Image from '../image'
import Icon from '../icon'

const [name, bem] = createUploadNameSpace('list')

export default defineComponent({
  name,
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  props: uploadListProps,
  emits: ['delete'],
  setup(props, { emit }) {
    const wrapperClassName = bem()
    const itemClassName = bem('list-item')
    const itemCloseClassName = bem('list-item', ['delete'], true)

    const handleDeleteItem = (index: number, item: UploadListItemType) => {
      emit('delete', index, item)
    }

    return {
      wrapperClassName,
      itemClassName,
      itemCloseClassName,
      handleDeleteItem
    }
  }
})
</script>
