# Button 按钮

```vue playground=MButton height=600
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
```

## API

### Props

| 参数     | 类型                                      | 默认值    | 说明                                   | 必传 |
| -------- | ----------------------------------------- | --------- | -------------------------------------- | ---- |
| theme    | `ThemeType`                               | `default` | 主题颜色                               | N    |
| size     | `SizeType`                                | `medium`  | 按钮大小                               | N    |
| disabled | `boolean`                                 | `false`   | 是否禁用按钮                           | N    |
| icon     | `string`                                  | -         | 按钮前图标，与 `Icon` 组件 `name` 一致 | N    |
| block    | `boolean`                                 | `false`   | 是否展示为块级元素                     | N    |
| fill     | `'solid' \| 'outline' \| 'none'`          | `solid`   | 填充模式，`outline` 为镂空展示         | N    |
| shape    | `'default' \| 'rounded' \| 'rectangular'` | `default` | 按钮形状                               | N    |
| loading  | `boolean`                                 | `false`   | 是否显示 loading 效果                  | N    |
