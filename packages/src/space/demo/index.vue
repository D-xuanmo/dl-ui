<template>
  <d-space direction="vertical" :gap="24">
    <d-space :gap="8">
      <d-button theme="primary">按钮</d-button>
      <d-button theme="primary">按钮</d-button>
      <d-button theme="primary">按钮</d-button>
    </d-space>

    <d-space :gap="8" direction="vertical">
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
      <d-button block theme="primary">按钮</d-button>
    </d-space>

    <div>
      <p>水平对齐方式</p>
      <d-radio-group v-model="justify" direction="horizontal">
        <d-radio value="start" label="start" />
        <d-radio value="center" label="center" />
        <d-radio value="end" label="end" />
        <d-radio value="between" label="between" />
        <d-radio value="around" label="around" />
        <d-radio value="evenly" label="evenly" />
      </d-radio-group>
      <d-space :gap="8" :justify="justify">
        <d-button block theme="primary">按钮</d-button>
        <d-button block theme="primary">按钮</d-button>
        <d-button block theme="primary">按钮</d-button>
      </d-space>
    </div>
  </d-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const justify = ref('start')
</script>
