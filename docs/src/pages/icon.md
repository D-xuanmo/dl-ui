# Icon 图标

图标基于 `SVG`，通过 `Icon` 组件使用

## 基础用法

通过 `name` 设置对应的图标名

```vue
<template>
  <d-icon name="close" />
  <d-icon name="close-o" />
  <d-icon name="tips" />
  <d-icon name="tips-o" />
  <d-icon name="success" />
  <d-icon name="warning" />
</template>
```

## 图标颜色、大小修改、旋转

通过 `size` 属性改变大小，`color` 可改变颜色

```vue
<template>
  <d-cell-group title="旋转">
    <d-cell content-align="left">
      <d-icon
        name="loading"
        spin
      />
      <d-icon
        name="loading-2"
        spin
      />
      <d-icon
        name="close"
        spin
      />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="大小调整">
    <d-cell content-align="left">
      <d-icon
        name="close"
        size="small"
      />
      <d-icon
        name="close"
        size="medium"
      />
      <d-icon
        name="close"
        size="large"
      />
      <d-icon
        name="tips"
        size="30px"
      />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="颜色修改">
    <d-cell content-align="left">
      <d-icon
        name="close"
        color="#f00"
      />
      <d-icon
        name="close"
        color="#ed7b2f"
      />
      <d-icon
        name="close"
        color="var(--d-primary)"
      />
    </d-cell>
  </d-cell-group>
</template>
```

## API

### Icon Props

| 参数  | 类型   | 默认值 | 说明                                                                     | 必传 |
| ----- | ------ | ------ | ------------------------------------------------------------------------ | ---- |
| name  | string | -      | 图标名称                                                                 | Y    |
| size  | string | medium | 图标大小，可选值：small/medium/large/string，为 `string` 时，单位为 `px` | N    |
| color | string | -      | 图标颜色                                                                 | N    |
