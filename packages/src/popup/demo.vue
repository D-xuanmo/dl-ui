<template>
  <d-cell-group
    round
    title="基础用法"
  >
    <d-cell
      title="基础弹框"
      arrow
      @click="handleShowPopup"
    />
    <d-popup v-model:visible="showPopup"> 我是内容 </d-popup>
  </d-cell-group>

  <d-cell-group
    round
    title="弹出位置"
  >
    <d-cell
      title="顶部弹出"
      content="placement: top"
      arrow
      @click="handleShowPopup2('top')"
    />
    <d-cell
      title="底部弹出"
      content="placement: bottom"
      arrow
      @click="handleShowPopup2('bottom')"
    />
    <d-cell
      title="左侧弹出"
      content="placement: left"
      arrow
      @click="handleShowPopup2('left')"
    />
    <d-cell
      title="右侧弹出"
      content="placement: right"
      arrow
      @click="handleShowPopup2('right')"
    />
    <d-popup
      v-model:visible="showPopup2"
      :placement="placement"
    />
  </d-cell-group>

  <d-cell-group
    round
    title="其他设置"
  >
    <d-cell
      title="圆角显示"
      arrow
      @click="handleShowPopup3"
    />
    <d-cell
      title="显示标题"
      arrow
      @click="handleShowPopup4"
    />
    <d-popup
      v-model:visible="showPopup3"
      placement="bottom"
      round
    />
    <d-popup
      v-model:visible="showPopup4"
      title="我是标题我是标题我是标题我是标题我是标题我是标题"
      placement="bottom"
      round
      closeable
      :popup-style="{ height: '50%' }"
    >
      我是内容
    </d-popup>
  </d-cell-group>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import { PlacementType } from '../common'

const showPopup = ref(false)
const showPopup2 = ref(false)
const showPopup3 = ref(false)
const showPopup4 = ref(false)
const placement = ref<PlacementType>('top')

function handleShowPopup() {
  showPopup.value = true
}

function handleShowPopup2(p: PlacementType) {
  placement.value = p
  showPopup2.value = true
}

function handleShowPopup3() {
  showPopup3.value = true
}

function handleShowPopup4() {
  showPopup4.value = true
}
</script>
