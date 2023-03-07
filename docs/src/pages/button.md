# Button 按钮

```vue playground=3tdghh3 height=600
<template>
  <p>填充模式</p>
  <d-button fill="solid" theme="primary">solid</d-button>
  <d-button fill="outline">outline</d-button>
  <d-button fill="none">none</d-button>

  <p>尺寸</p>
  <d-button size="small" fill="solid" theme="primary">small</d-button>
  <d-button size="medium" fill="solid" theme="primary">medium</d-button>
  <d-button size="large" fill="solid" theme="primary">large</d-button>

  <p>主题</p>
  <d-button theme="default">default</d-button>
  <d-button theme="primary">primary</d-button>
  <d-button theme="success">success</d-button>
  <d-button theme="warning">warning</d-button>
  <d-button theme="danger">danger</d-button>

  <p>镂空主题</p>
  <d-button block theme="default" fill="outline">default</d-button>
  <d-button block theme="primary" fill="outline">primary</d-button>
  <d-button block theme="success" fill="outline">success</d-button>
  <d-button block theme="warning" fill="outline">warning</d-button>
  <d-button block theme="danger" fill="outline">danger</d-button>

  <p>形状</p>
  <d-button theme="primary">default</d-button>
  <d-button shape="rounded" theme="primary">rounded</d-button>
  <d-button shape="rectangular" theme="primary">rectangular</d-button>

  <p>禁用</p>
  <d-button theme="primary" disabled>default</d-button>
  <d-button theme="success" fill="outline" disabled>default</d-button>
  <d-button shape="rounded" disabled theme="danger">rounded</d-button>

  <p>加载状态</p>
  <d-button theme="primary" loading>default</d-button>
  <d-button theme="success" fill="outline" loading>default</d-button>
  <d-button shape="rounded" loading theme="danger">rounded</d-button>

  <p>图标模式</p>
  <d-button theme="primary" icon="star" />
  <d-button theme="success" icon="star-f">default</d-button>
  <d-button theme="success" fill="outline" icon="star-f">default</d-button>
</template>

<style>
.d-button {
  margin: 0 10px 10px 0;
}
</style>
```
