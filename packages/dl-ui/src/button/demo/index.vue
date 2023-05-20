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
    <d-space :gap="10">
      <d-button size="small" fill="solid" theme="primary">small</d-button>
      <d-button size="medium" fill="solid" theme="primary">medium</d-button>
      <d-button size="large" fill="solid" theme="primary">large</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>主题</p>
    <d-space :gap="10" wrap>
      <d-button theme="default">default</d-button>
      <d-button theme="primary">primary</d-button>
      <d-button theme="success">success</d-button>
      <d-button theme="warning">warning</d-button>
      <d-button theme="danger">danger</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>镂空主题</p>
    <d-space :gap="10" direction="vertical">
      <d-button block theme="default" fill="outline">default</d-button>
      <d-button block theme="primary" fill="outline">primary</d-button>
      <d-button block theme="success" fill="outline">success</d-button>
      <d-button block theme="warning" fill="outline">warning</d-button>
      <d-button block theme="danger" fill="outline">danger</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>形状</p>
    <d-space :gap="10">
      <d-button theme="primary">default</d-button>
      <d-button shape="rounded" theme="primary">rounded</d-button>
      <d-button shape="rectangular" theme="primary">rectangular</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>禁用</p>
    <d-space :gap="10">
      <d-button theme="primary" disabled>default</d-button>
      <d-button theme="success" fill="outline" disabled>default</d-button>
      <d-button shape="rounded" disabled theme="danger">rounded</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>加载状态</p>
    <d-space :gap="10">
      <d-button theme="primary" loading>default</d-button>
      <d-button theme="success" fill="outline" loading>default</d-button>
      <d-button shape="rounded" loading theme="danger">rounded</d-button>
    </d-space>
  </dl-demo-block>

  <dl-demo-block>
    <p>图标模式</p>
    <d-space :gap="10">
      <d-button theme="primary">
        <template #icon>
          <star-outlined />
        </template>
      </d-button>
      <d-button theme="success">
        <template #icon>
          <star-outlined />
        </template>
        default
      </d-button>
    </d-space>
  </dl-demo-block>
</template>

<script lang="ts" setup>
import { StarOutlined } from '@xuanmo/dl-icons'
</script>
