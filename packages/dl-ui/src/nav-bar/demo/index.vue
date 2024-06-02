<template>
  <d-space direction="vertical" :gap="30">
    <d-nav-bar title="标题" @click-left="onLeftClick" />
    <d-nav-bar
      left-text="返回"
      title="标题居左"
      title-align="left"
      back-arrow
      right-text="按钮"
      @click-left="onLeftClick"
      @click-right="onRightClick"
    />
    <d-nav-bar
      left-text="返回"
      title="标题"
      back-arrow
      right-text="按钮"
      @click-left="onLeftClick"
      @click-right="onRightClick"
    />
  </d-space>
</template>

<script setup lang="ts">
import { useMessage } from '@xuanmo/dl-common'

const message = useMessage()

const onLeftClick = () => {
  message.info('点击了左侧按钮')
}

const onRightClick = () => {
  message.info('点击了右侧按钮')
}
</script>
