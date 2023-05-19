<template>
  <dl-demo-block>
    <p>填充模式</p>
    <d-button fill="solid" theme="primary">solid</d-button>
    <d-button fill="outline" class="m-l-5px m-r-5px">outline</d-button>
    <d-button fill="none">none</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>链接模式</p>
    <d-space :gap="8">
      <d-button link theme="default">default</d-button>
      <d-button link theme="primary">primary</d-button>
      <d-button link theme="success">success</d-button>
      <d-button link theme="warning">warning</d-button>
      <d-button link theme="danger">danger</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>尺寸</p>
    <d-button size="small" fill="solid" theme="primary">small</d-button>
    <d-button size="medium" fill="solid" theme="primary" class="m-l-5px m-r-5px">medium</d-button>
    <d-button size="large" fill="solid" theme="primary">large</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>主题</p>
    <d-button theme="default" class="m-r-5px m-b-5px">default</d-button>
    <d-button theme="primary" class="m-r-5px m-b-5px">primary</d-button>
    <d-button theme="success" class="m-r-5px m-b-5px">success</d-button>
    <d-button theme="warning" class="m-r-5px m-b-5px">warning</d-button>
    <d-button theme="danger" class="m-r-5px m-b-5px">danger</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>镂空主题</p>
    <d-button block theme="default" fill="outline" class="m-b-10px">default</d-button>
    <d-button block theme="primary" fill="outline" class="m-b-10px">primary</d-button>
    <d-button block theme="success" fill="outline" class="m-b-10px">success</d-button>
    <d-button block theme="warning" fill="outline" class="m-b-10px">warning</d-button>
    <d-button block theme="danger" fill="outline" class="m-b-10px">danger</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>形状</p>
    <d-button theme="primary">default</d-button>
    <d-button shape="rounded" theme="primary" class="m-l-5px m-r-5px">rounded</d-button>
    <d-button shape="rectangular" theme="primary">rectangular</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>禁用</p>
    <d-button theme="primary" disabled>default</d-button>
    <d-button theme="success" fill="outline" disabled class="m-l-5px m-r-5px">default</d-button>
    <d-button shape="rounded" disabled theme="danger">rounded</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>加载状态</p>
    <d-button theme="primary" loading>default</d-button>
    <d-button theme="success" fill="outline" loading class="m-l-5px m-r-5px">default</d-button>
    <d-button shape="rounded" loading theme="danger">rounded</d-button>
  </dl-demo-block>

  <dl-demo-block>
    <p>图标模式</p>
    <d-button theme="primary" icon="star" />
    <d-button theme="success" icon="star-f" class="m-l-5px m-r-5px">default</d-button>
    <d-button theme="success" fill="outline" icon="star-f">default</d-button>
  </dl-demo-block>
</template>

<script lang="ts" setup></script>
