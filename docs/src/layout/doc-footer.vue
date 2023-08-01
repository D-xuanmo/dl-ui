<template>
  <d-space justify="between" class="doc-footer">
    <d-space direction="vertical">
      <h3>当前版本</h3>
      <ul>
        <li>dl-common：{{ commonVersion }}</li>
        <li>dl-ui：{{ version }}</li>
      </ul>
    </d-space>
    <d-space direction="vertical">
      <h3>联系我</h3>
      <ul>
        <li>QQ：993901865</li>
        <li>微信：D-xuanmo</li>
      </ul>
    </d-space>
    <d-space direction="vertical">
      <h3>开源协议</h3>
      <p>
        本项目基于
        <a href="https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89" target="_blank"
          >MIT</a
        >
        协议，欢迎有兴趣的朋友一起交流
      </p>
      <p>
        Copyright © 2022-PRESENT
        <a href="https://github.com/D-xuanmo" target="_blank">D-xuanmo</a>
      </p>
    </d-space>
  </d-space>
</template>

<script lang="ts" setup>
import { version as commonVersion } from '@xuanmo/dl-common'
import { version } from '@xuanmo/dl-ui'
</script>

<style scoped lang="scss">
.doc-footer {
  margin-top: 30px;
  padding: var(--d-gap-sm) 40px;
  background-color: #f0f3fa;

  h3 {
    margin: var(--d-gap-xs) 0 !important;
  }

  ul {
    margin-top: 0 !important;
  }
}
</style>
