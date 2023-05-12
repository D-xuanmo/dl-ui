<template>
  <header :class="headerClassName">
    <div :class="leftClassName">
      <img src="https://upyun.xuanmo.xin/logo/dl-ui.svg" alt="Vue dl-ui" />
      <h1>Vue DL UI</h1>
    </div>
    <div :class="centerClassName">
      <d-space :gap="32" align="center" justify="end">
        <d-button
          size="small"
          fill="none"
          link
          :theme="docButtonTheme"
          @click="handleClick('/docs')"
        >
          文档
        </d-button>
        <d-button
          size="small"
          fill="none"
          link
          :theme="compButtonTheme"
          @click="handleClick('/components')"
        >
          组件
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
  </header>
</template>

<script lang="ts" setup>
import { classNames } from '@doc/utils'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const headerClassName = classNames('header')
const leftClassName = classNames('header-left')
const centerClassName = classNames('header-center')
const rightClassName = classNames('header-right')

const route = useRoute()
const router = useRouter()

const docButtonTheme = computed(() => {
  return route.path.startsWith('/docs') ? 'primary' : 'default'
})
const compButtonTheme = computed(() => {
  return route.path.startsWith('/components') ? 'primary' : 'default'
})

const handleClick = (path: string) => {
  router.push(path)
}
</script>
