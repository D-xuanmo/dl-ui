<template>
  <d-space :gap="8">
    <d-button @click="visible = true">打开抽屉</d-button>
    <d-button @click="visible2 = true">嵌套抽屉</d-button>
  </d-space>
  <d-space :gap="8">
    <d-button @click="showDrawer('top')">上</d-button>
    <d-button @click="showDrawer('right')">右</d-button>
    <d-button @click="showDrawer('bottom')">下</d-button>
    <d-button @click="showDrawer('left')">左</d-button>
  </d-space>
  <d-drawer
    v-model:visible="visible"
    title="标题"
    placement="top"
    @confirm="showMessage"
    @close="showCloseMessage"
  >
    <p v-for="i in 100" :key="i">内容滚动</p>
  </d-drawer>
  <d-drawer
    v-model:visible="visible2"
    title="标题"
    :width="500"
    @confirm="showMessage"
    @close="showCloseMessage"
  >
    <d-button theme="primary" @click="visible3 = true">打开下一个</d-button>
    <d-drawer
      v-model:visible="visible3"
      title="标题"
      :footer="false"
      @confirm="showMessage"
      @close="showCloseMessage"
    >
      <d-button theme="primary" @click="visible4 = true">打开对话框</d-button>
      <d-dialog v-model:visible="visible4">对话框内容</d-dialog>
    </d-drawer>
  </d-drawer>
  <d-drawer
    v-model:visible="visible5"
    title="标题"
    :placement="placement"
    :footer="false"
    @confirm="showMessage"
    @close="showCloseMessage"
  >
    我是内容
  </d-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from '@xuanmo/dl-common'

const placement = ref('right')
const visible = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)

const showMessage = () => {
  MessagePlugin.success('onConfirm')
}

const showCloseMessage = () => {
  MessagePlugin.info('onClose')
}

const showDrawer = (p: string) => {
  placement.value = p
  visible5.value = true
}
</script>
