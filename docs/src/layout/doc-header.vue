<template>
  <header :class="headerClassName">
    <div :class="leftClassName">
      <img src="https://upyun.xuanmo.xin/logo/dynamic-form-32X32.png" alt="Dynamic Form" />
      <h1>Dynamic Form</h1>
    </div>
    <div :class="rightClassName">
      <a href="https://run.xuanmo.xin/" target="_blank">
        <d-button size="small" fill="none">演练场</d-button>
      </a>
      <a href="https://github.com/D-xuanmo/dynamic-form" target="_blank"><img :src="githubLogo" /></a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { classNames } from '@doc/utils'
import githubLogo from '../assets/images/GitHub.svg'

const headerClassName = classNames('header')
const leftClassName = classNames('header-left')
const rightClassName = classNames('header-right')
</script>
