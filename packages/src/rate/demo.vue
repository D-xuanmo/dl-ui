<template>
  <d-cell-group title="基础用法">
    <d-cell content-align="left">
      <d-rate v-model="value" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="图标修改">
    <d-cell content-align="left">
      <d-rate
        v-model="value"
        unchecked-icon="heart"
        checked-icon="heart-f"
      />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="大小、颜色调整">
    <d-cell content-align="left">
      <d-rate
        v-model="value"
        active-color="#f00"
        :gap="8"
        size="large"
      />
      <d-rate
        v-model="value"
        active-color="#f00"
        :gap="8"
        size="30px"
      />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="禁用">
    <d-cell content-align="left">
      <d-rate
        v-model="value"
        disabled
      />
    </d-cell>
  </d-cell-group>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'

const value = ref(2)
</script>
