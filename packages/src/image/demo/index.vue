<template>
  <dl-demo-block title="基础用法">
    <d-image :src="imgSrc" width="100" />
  </dl-demo-block>

  <dl-demo-block title="填充模式">
    <d-space :gap="20" wrap>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="cover" />
        <p>cover</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="contain" />
        <p>contain</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="none" />
        <p>none</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="scale-down" />
        <p>scale-down</p>
      </div>
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="fill" />
        <p>fill</p>
      </div>
    </d-space>
  </dl-demo-block>

  <dl-demo-block title="位置">
    <d-space :gap="20">
      <div>
        <d-image :src="imgSrc" width="100" height="100" fit="cover" position="left" />
        <p>left</p>
      </div>
    </d-space>
  </dl-demo-block>

  <dl-demo-block title="显示加载效果">
    <d-image
      src="https://upyun.xuanmo.xin/logo/20230311103746211510.JPG"
      width="100"
      height="100"
      show-loading
    />
  </dl-demo-block>

  <dl-demo-block title="加载失败">
    <d-image
      src="https://upyun.xuanmo.xin/logo/202303111037462115101.JPG"
      width="100"
      height="100"
    />
  </dl-demo-block>
</template>

<script lang="ts" setup>
const imgSrc = 'https://upyun.xuanmo.xin/logo/x-logo.png'
</script>
