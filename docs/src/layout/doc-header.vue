<template>
  <header :class="headerClassName">
    <div :class="leftClassName">
      <img src="https://upyun.xuanmo.xin/logo/dl-ui.svg" alt="Vue dl-ui" />
      <h1>Vue DL UI</h1>
    </div>
    <div :class="rightClassName">
      <d-space :gap="16" align="center" justify="end">
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

const headerClassName = classNames('header')
const leftClassName = classNames('header-left')
const rightClassName = classNames('header-right')
</script>
