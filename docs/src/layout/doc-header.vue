<template>
  <div :class="leftClassName">
    <logo />
    <h1>Vue DLUI</h1>
  </div>
  <div :class="centerClassName">
    <d-space :gap="32" align="center" justify="end">
      <d-button
        size="small"
        fill="none"
        link
        :theme="getButtonTheme('/docs')"
        @click="handleClick('/docs')"
      >
        文档
      </d-button>
      <d-button
        size="small"
        fill="none"
        link
        :theme="getButtonTheme('/comp-common')"
        @click="handleClick('/comp-common')"
      >
        公用组件
      </d-button>
      <d-button
        size="small"
        fill="none"
        link
        :theme="getButtonTheme('/comp-mobile')"
        @click="handleClick('/comp-mobile')"
      >
        移动端组件
      </d-button>
    </d-space>
  </div>
  <div :class="rightClassName">
    <d-space :gap="32" align="center" justify="end">
      <a href="https://run.xuanmo.xin/" target="_blank">
        <d-button size="small" fill="none" link>Playground</d-button>
      </a>
      <a href="https://github.com/D-xuanmo/validator" target="_blank">
        <d-button size="small" fill="none" link>数据校验</d-button>
      </a>
      <a href="https://github.com/D-xuanmo/dl-ui" target="_blank">
        <d-button size="small" fill="none" link>GitHub</d-button>
      </a>
    </d-space>
  </div>
</template>

<script lang="ts" setup>
import { classNames } from '@doc/utils'
import { useRoute, useRouter } from 'vue-router'
import { RoutePath } from '@doc/env'
import Logo from './logo.vue'

const leftClassName = classNames('header-left')
const centerClassName = classNames('header-center')
const rightClassName = classNames('header-right')

const route = useRoute()
const router = useRouter()

const getButtonTheme = (path: `/${RoutePath}`) => {
  return route.path.startsWith(path) ? 'primary' : 'default'
}

const handleClick = (path: string) => {
  router.push(path)
}
</script>
