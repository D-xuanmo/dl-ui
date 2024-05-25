<template>
  <d-space direction="vertical" :gap="10">
    <d-button block @click="visible = true">显示</d-button>
    <d-button block @click="showActionSheet">函数调用</d-button>
  </d-space>
  <d-action-sheet v-model:visible="visible" :options="options" description="我是描述内容" />
</template>

<script setup lang="ts">
import { ActionSheetOptions } from '../types'
import { ref, h } from 'vue'
import { ShareOutlined } from '@xuanmo/dl-icons'
import { useActionSheet } from '../function-call'
import { useMessage } from '@xuanmo/dl-common'

const actionSheet = useActionSheet()
const message = useMessage()

const visible = ref(false)

const options: ActionSheetOptions = [
  { value: 'default', label: '默认主题', icon: h(ShareOutlined, { size: 'small' }) },
  { value: 'primary', status: 'primary', label: '主题' },
  { value: 'success', status: 'success', label: '成功主题' },
  { value: 'warning', status: 'warning', label: '警告主题' },
  { value: 'danger', status: 'danger', label: '错误主题' },
  { value: 'danger', disabled: true, label: '错误主题' }
]

const showActionSheet = () => {
  actionSheet({
    options,
    showCancel: false,
    onSelected(item) {
      message.success(item.label)
    }
  })
}
</script>
