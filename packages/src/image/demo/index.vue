<template>
  <d-space :gap="16" wrap>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" />
      <p>fill</p>
    </div>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" fit="cover" />
      <p>cover</p>
    </div>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" fit="contain" />
      <p>contain</p>
    </div>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" fit="none" />
      <p>none</p>
    </div>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" fit="scale-down" />
      <p>scale-down</p>
    </div>
    <div>
      <d-image :src="imgSrc" :width="100" :height="100" fit="scale-down" show-loading />
      <p>loading</p>
    </div>
    <div>
      <d-image :src="`${imgSrc}1`" :width="100" :height="100" fit="scale-down" show-loading />
      <p>加载失败</p>
    </div>
  </d-space>
</template>

<script lang="ts" setup>
const imgSrc = 'https://upyun.xuanmo.xin/logo/x-logo.png'
</script>
