<template>
  <DCellGroup
    round
    title="基础用法"
  >
    <DCell
      title="基础弹框"
      arrow
      @click="handleShowPopup"
    />
    <DPopup v-model:visible="showPopup"> 我是内容 </DPopup>
  </DCellGroup>

  <DCellGroup
    round
    title="弹出位置"
  >
    <DCell
      title="顶部弹出"
      content="placement: top"
      arrow
      @click="handleShowPopup2('top')"
    />
    <DCell
      title="底部弹出"
      content="placement: bottom"
      arrow
      @click="handleShowPopup2('bottom')"
    />
    <DCell
      title="左侧弹出"
      content="placement: left"
      arrow
      @click="handleShowPopup2('left')"
    />
    <DCell
      title="右侧弹出"
      content="placement: right"
      arrow
      @click="handleShowPopup2('right')"
    />
    <DPopup
      v-model:visible="showPopup2"
      :placement="placement"
    />
  </DCellGroup>

  <DCellGroup
    round
    title="其他设置"
  >
    <DCell
      title="圆角显示"
      arrow
      @click="handleShowPopup3"
    />
    <DCell
      title="显示标题"
      arrow
      @click="handleShowPopup4"
    />
    <DPopup
      v-model:visible="showPopup3"
      placement="bottom"
      round
    />
    <DPopup
      v-model:visible="showPopup4"
      title="我是标题我是标题我是标题我是标题我是标题我是标题"
      placement="bottom"
      round
      closeable
      :popup-style="{ height: '50%' }"
    >
      我是内容
    </DPopup>
  </DCellGroup>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
import { PositionType } from '../common'

const showPopup = ref(false)
const showPopup2 = ref(false)
const showPopup3 = ref(false)
const showPopup4 = ref(false)
const placement = ref<PositionType>('top')

function handleShowPopup() {
  showPopup.value = true
}

function handleShowPopup2(p: PositionType) {
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
